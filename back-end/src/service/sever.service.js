const { where } = require('sequelize');
const db = require('../model');
const Sever = db.sever;
exports.create = async (newSever) => {
    try {
        return Sever.create(newSever);
    } catch (err) {
        console.log(err);
    }
};

exports.destroy = async (severId) => {
    try {
        return Sever.destroy({
            where: {
                chat_room_id: severId,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

exports.retrive = async (severId) => {
    try {
        return Sever.findOne({
            where: {
                chat_room_id: severId,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
