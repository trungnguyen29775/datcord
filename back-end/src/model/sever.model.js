const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Sever = sequelize.define(
        'sever',
        {
            chat_room_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            avt_file_path: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            room_owner: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: true,
        },
    );
    return Sever;
};
