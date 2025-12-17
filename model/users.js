
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            phone_num: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password_hash: {
                type: DataTypes.TEXT,
                allowNull: false
            }

        },
        {
            tableName: 'users',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: false,
        }
    );

    User.associate = (models) => {
        User.hasMany(models.List, {foreignKey: 'user_id'});
        User.hasMany(models.WhatsAppMessage, {foreignKey: 'user_id'});
    };

    return User;
};