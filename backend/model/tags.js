
module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define(
        "Tag",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
        },
        {
            tableName: 'tags',
            timestamps: false,
        }
    );

    Tag.associate = (models) => {
        Tag.belongsToMany(models.List, {
            through: models.ListTag,
            foreignKey: 'tag_id',
            otherKey: 'list_id',
        });
    };

    return Tag;
}