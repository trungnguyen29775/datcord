const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Friendship = sequelize.define(
        'friendship',
        {
            friendship_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
        },
        {
            timestamps: false,
        },
    );
    return Friendship;
};
