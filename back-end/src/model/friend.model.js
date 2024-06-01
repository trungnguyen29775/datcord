const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Friend = sequelize.define(
        'friend',
        {
            friend_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncreasement: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        },
    );
    return Friend;
};
