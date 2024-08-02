const { where, Op } = require('sequelize');
const db = require('../model');
const Sever = db.sever;
const ChannelService = require('./channel.service');
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

exports.getSeverData = async (req, res) => {
    try {
        const responseData = {};
        const chatRoomId = req.body.chatRoomId;
        return Sever.findOne({
            where: {
                chat_room_id: chatRoomId,
            },
        }).then((sever) => {
            responseData.sever = sever;
            return ChannelService.findChannelByChatRoomId(chatRoomId).then((channels) => {
                responseData.channels = channels;
                res.send(responseData);
            });
        });
    } catch (err) {
        console.log(err);
    }
};
