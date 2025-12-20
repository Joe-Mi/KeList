const express = require('express'); 
const router = express.Router();

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config()
const db = require('../model/index.js');
const bcrypt = require('bcrypt');


router.post('/SignIn', async (req, res) => {
  try {
    const { name, email, phone_num, password } = req.body;
    console.log(req.body);

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({
      name,
      email,
      phone_num,
      password_hash: hashedPassword
    });

    // Return user info without exposing the hash
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone_num: newUser.phone_num
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/LogIn', async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await db.User.findOne({ where: { name } });
    if (!user) return res.status(401).json({ message: 'Invalid details' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid details' });

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.json({
      id: user.id,
      name: user.name, 
      email: user.email,
      phone_num: user.phone_num,
      tk: token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router