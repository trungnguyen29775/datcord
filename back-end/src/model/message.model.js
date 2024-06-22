const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define(
        'message',
        {
            message_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            sender: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        },
    );
    return Message;
};
