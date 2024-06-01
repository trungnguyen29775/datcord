const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Channel = sequelize.define(
        'channel',
        {
            channel_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            channel_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        },
    );
    return Channel;
};
