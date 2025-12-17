
module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define(
        "List",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title : {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                 defaultValue: 'general',
            },  
        },
        {
            tableName: 'lists',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    List.associate = (models) => {
        List.belongsTo(models.User, {foreignKey: 'user_id'});
        List.hasMany(models.ListItem, {foreignKey: 'list_id'});
        List.belongsToMany (models.Tag, {
            through: models.ListTag,
            foreignKey: 'list_id',
            otherKey: 'tag_id',
        });
    };

    return List;
}