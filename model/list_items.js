
module.exports = (sequelize, DataTypes) => {
    const ListItem = sequelize.define(
        "ListItem",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            list_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            item_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            quantity: DataTypes.DECIMAL,
            unit: DataTypes.STRING,
            is_completed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            notes: DataTypes.TEXT,
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['list_id', 'item_id'],
                },
            ]
        },
        {
            tableName: 'list_items',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: false,
        }
    );

    ListItem.associate = (models) => {
        ListItem.belongsTo(models.List, {foreignKey: 'list_id'});
        ListItem.belongsTo(models.Item, {foreignKey: 'item_id'});
    };

    return ListItem;
}