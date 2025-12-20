
module.exports = (sequelize, DataTypes) => {
    const WhatsAppMessage = sequelize.define(
        "WhatsAppMessage",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            message_text: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            parsed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            parsed_data: DataTypes.JSONB,
        },
        {
            tableName: 'WhatsApp_Messages',
            timestamps: true,
            createdAt: 'received_at',
            updatedAt: false,
        }
    );

    WhatsAppMessage.associate = (models) => {
        WhatsAppMessage.belongsTo(models.User, {foreignKey: 'user_id'});
    };

    return WhatsAppMessage;
};