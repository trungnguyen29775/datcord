const { where } = require('sequelize');
const db = require('../model');
const UserSever = db.userSever;
exports.create = async (newUserSever) => {
    try {
        return UserSever.create(newUserSever);
    } catch (err) {
        res.status(500).send(`Error due to ${err}`);
    }
};
