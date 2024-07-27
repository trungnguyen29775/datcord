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

exports.destroy = async (userSeverId) => {
    try {
        return UserSever.destroy({
            where: {
                user_sever_id: userSeverId,
            },
        });
    } catch (err) {
        res.status(500).send(`Error due to ${err}`);
    }
};
