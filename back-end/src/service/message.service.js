const { where } = require('sequelize');
const db = require('../model');
const Message = db.message;

exports.create = async (req, res) => {
    try {
    } catch (err) {
        console.log(err);
    }
};

exports.findMessageByChannelId = async (channelId) => {
    try {
        return Message.findAll({
            where: {
                channel_id: channelId,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
