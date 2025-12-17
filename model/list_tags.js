
module.exports = (sequelize, DataTypes) => {
    const ListTag = sequelize.define(
        "ListTag",
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
            tag_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            tableName: 'list_tags',
            timestamps: false,
        }
    );

    

    return ListTag;
}