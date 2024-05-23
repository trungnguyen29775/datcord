const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const UserSever = sequelize.define(
        'user_sever',
        {
            user_sever_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncreasement: true,
            },
        },
        {
            timestamps: false,
        },
    );
    return UserSever;
};
