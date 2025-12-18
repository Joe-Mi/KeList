const express = require('express'); 
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const db = require('../model/index.js');

router.get('/user/lists', requireAuth, async (req, res) => {
  try {
    const user_id = req.user.id

    const lists = await db.List.findAll({
      where: { user_id },
      include: [
        {
          model: db.ListItem,
          include: [db.Item],
        },
      ],
    });

    const response = lists.map(list => ({
      id: list.id,
      title: list.title,
      type: list.type,
      items: list.ListItems.map(li => ({
        id:li.Item.id,
        name: li.Item.name,
        category: li.Item.category,
        quantity: li.quantity,
        unit: li.unit,
        is_completed: li.is_completed,
        notes: '',
      })),
    }));

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch lists' })
  }
});



function parseItem(entry) {
  if (!entry?.name || typeof entry.name !== 'string') {
    throw new Error('Item name is required');
  }

  return {
    name: entry.name.trim(),
    category: entry.category?.trim() || null,

    quantity: entry.quantity
      ? Number(entry.quantity)
      : 1,

    unit: entry.unit?.trim() || null,
    notes: entry.notes?.trim() || null,
    is_completed: Boolean(entry.is_completed),
  };
}


router.post('/newList', requireAuth, async (req, res) => {
  const { title, type, items } = req.body;
  const user_id = req.user.id;

  if (!user_id || !title || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const transaction = await db.sequelize.transaction();

  try {
    const list = await db.List.create(
      { user_id, title, type },
      { transaction }
    );

    for (const rawEntry of items) {
      const entry = parseItem(rawEntry);

      const [item] = await db.Item.findOrCreate({
        where: { 
          name: entry.name,
          category: entry.category
         },
        defaults: { category: entry.category },
        transaction,
      });

      await db.ListItem.create(
        {
          list_id: list.id,
          item_id: item.id,
          quantity: entry.quantity,
          unit: entry.unit,
          notes: entry.notes,
          is_completed: entry.is_completed === true,
        },
        { transaction }
      );
    }

    await transaction.commit();

    res.status(201).json({
      list_id: list.id,
      message: 'List created successfully',
    });

  } catch (error) {
    await transaction.rollback();
    console.error(error);

    res.status(400).json({
      error: error.message,
    });
  }
});

router.post('/:listId/items', requireAuth, async (req, res) => {
  const { rawEntry } = req.body;
  const list_id = req.params.listId;
  const user_id = req.user.id;

  const transaction = await db.sequelize.transaction();

  try {
    // Verify list ownership
    const list = await db.List.findOne({
      where: {
        id: list_id,
        user_id,
      },
      transaction,
    });

    if (!list) {
      await transaction.rollback();
      return res.status(404).json({ error: 'List not found' });
    }

    // Parse & validate input
    const newItem = parseItem(rawEntry);

    // Find or create item
    const [item] = await db.Item.findOrCreate({
      where: {
        name: newItem.name,
        category: newItem.category,
      },
      defaults: {
        category: newItem.category,
      },
      transaction,
    });

    // Prevent duplicates
    const existing = await db.ListItem.findOne({
      where: {
        list_id,
        item_id: item.id,
      },
      transaction,
    });

    if (existing) {
      await transaction.rollback();
      return res.status(409).json({ error: 'Item already exists in list' });
    }

    // Create junction row
    await db.ListItem.create(
      {
        list_id,
        item_id: item.id,
        quantity: newItem.quantity,
        unit: newItem.unit,
        notes: newItem.notes,
        is_completed: newItem.is_completed === true,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({
      list_id,
      item: {
        id: item.id,
        name: item.name,
        quantity: newItem.quantity,
        unit: newItem.unit,
        is_completed: false,
      },
      message: 'Item added successfully',
    });

  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});


router.delete('/list/item', requireAuth, async (req, res) => {
  const { list_id, item_id } = req.body;
  const user_id = req.user.id;

  const transaction = await db.sequelize.transaction();

  try {
    // Verify list ownership
    console.log(`list.id:${list_id}, item.id:${item_id}`)
    const list = await db.List.findOne({
      where: {
        id: list_id,
        user_id,
      },
      transaction,
    });

    if (!list) {
      await transaction.rollback();
      return res.status(404).json({ error: 'List not found' });
    }

    // Delete junction row
    const deletedCount = await db.ListItem.destroy({
      where: {
        list_id,
        item_id,
      },
      transaction,
    });

    if (deletedCount === 0) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Item not found in list' });
    }

    await transaction.commit();

    res.status(200).json({
      list_id,
      item_id,
      message: 'Item removed successfully',
    });

  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router