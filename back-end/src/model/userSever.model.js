const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const UserSever = sequelize.define(
        'user_sever',
        {
            user_sever_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: false,
        },
    );
    return UserSever;
};
