const db = require('../model');
const Channel = db.channel;
exports.create = async (newChannel) => {
    try {
        return Channel.create(newChannel);
    } catch (err) {
        console.log(err);
    }
};

exports.destroy = async (channelId) => {
    try {
        return Channel.destroy({
            where: {
                channel_id: channelId,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
