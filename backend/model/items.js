
module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
        "Item",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: DataTypes.STRING,  
        },
        {
            tableName: 'items',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: false,
        }
    );

    Item.associate = (models) => {
        Item.hasMany(models.ListItem, { foreignKey: 'item_id' });
    };

    return Item;
}