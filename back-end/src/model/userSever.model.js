const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const UserSever = sequelize.define(
        'user_sever',
        {
            user_sever_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
        },
        {
            timestamps: false,
        },
    );
    return UserSever;
};
