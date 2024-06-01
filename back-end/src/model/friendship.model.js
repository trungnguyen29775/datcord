const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Friendship = sequelize.define(
        'friendship',
        {
            friendship_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncreasement: true,
            },
        },
        {
            timestamps: false,
        },
    );
    return Friendship;
};
