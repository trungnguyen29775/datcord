const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Friend = sequelize.define(
        'friend',
        {
            friend_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            receiver: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        },
    );
    return Friend;
};
