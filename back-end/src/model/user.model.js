const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        'user',
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncreasement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avt_file_path: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        },
    );
    return User;
};
