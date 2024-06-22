const db = require('../model');
const Friend = db.friend;
const Friendship = db.friendship;
const User = db.user;
const { Op, where } = require('sequelize');

exports.create = async (req, res) => {
    try {
        const newFriend = {
            friend_id: `friend${req.body.usernameSender}${req.body.usernameReceiver}`,
            status: 'friend',
            receiver: req.body.usernameReceiver,
        };
        let responseData = {};

        await Friend.create(newFriend).then((result) => {
            const newFriendship = {
                friendship_id: `friendship${req.body.usernameSender}${req.body.usernameReceiver}`,
                sender: req.body.usernameSender,
                friend_id: result.friend_id,
            };
            Friendship.create(newFriendship).then((data) => {
                responseData = {
                    ...newFriend,
                    ...newFriendship,
                };
                res.status(200).send(responseData);
            });
        });
    } catch (err) {
        res.status(500).send(`Error due to ${err}`);
    }
};

exports.retrieve = async (req, res) => {
    try {
        const username = req.body.username;
        const requestSendUsernames = [];
        const requestReceiveUsernames = [];
        const friendUsernames = [];
        const friendIdFriend = [];
        const friendIdReceiver = [];
        const responseData = {};

        return Friendship.findAll({
            where: {
                sender: username,
            },
        }).then((result) => {
            const friendIds = [];
            result?.map((item) => friendIds.push(item.friend_id));
            return Friend.findAll({
                where: {
                    friend_id: {
                        [Op.in]: friendIds,
                    },
                },
            }).then((result) => {
                result.map((item) => {
                    if (item.status === 'pending') requestSendUsernames.push(item.receiver);
                    else if (item.status === 'friend') friendUsernames.push(item.receiver);
                });
                return User.findAll({
                    where: {
                        username: {
                            [Op.in]: requestSendUsernames,
                        },
                    },
                }).then((result) => {
                    const responseDataTemp = [];
                    result.map((item) =>
                        responseDataTemp.push({
                            username: item.username,
                            avtFilePath: item.avt_file_path,
                            name: item.name,
                            dob: item.dob,
                        }),
                    );
                    responseData.requestSend = responseDataTemp;

                    return User.findAll({
                        where: {
                            username: {
                                [Op.in]: friendUsernames,
                            },
                        },
                    }).then((result) => {
                        const responseDataTemp = [];
                        result.map((item) =>
                            responseDataTemp.push({
                                username: item.username,
                                avtFilePath: item.avt_file_path,
                                name: item.name,
                                dob: item.dob,
                            }),
                        );
                        responseData.friend = responseDataTemp;
                        Friend.findAll({
                            where: {
                                receiver: username,
                            },
                        }).then((result) => {
                            result.map((item) => {
                                if (item.status === 'pending') friendIdReceiver.push(item.friend_id);
                                else if (item.status === 'friend') friendIdFriend.push(item.friend_id);
                            });
                            return Friendship.findAll({
                                where: {
                                    friend_id: {
                                        [Op.in]: friendIdReceiver,
                                    },
                                },
                            })
                                .then((result) => {
                                    const senderUsernames = [];
                                    result.map((item) => senderUsernames.push(item.sender));
                                    return User.findAll({
                                        where: {
                                            username: {
                                                [Op.in]: senderUsernames,
                                            },
                                        },
                                    });
                                })
                                .then((result) => {
                                    const responseDataTemp = [];
                                    result.map((item) =>
                                        responseDataTemp.push({
                                            username: item.username,
                                            avtFilePath: item.avt_file_path,
                                            name: item.name,
                                            dob: item.dob,
                                        }),
                                    );
                                    responseData.requestReceiver = responseDataTemp;
                                    return Friendship.findAll({
                                        where: {
                                            friend_id: {
                                                [Op.in]: friendIdFriend,
                                            },
                                        },
                                    }).then((result) => {
                                        const senderUsernames = result.map((item) => item.sender);
                                        User.findAll({
                                            where: {
                                                username: {
                                                    [Op.in]: senderUsernames,
                                                },
                                            },
                                        }).then((result) => {
                                            const responseDataTemp = [];
                                            result.map((item) =>
                                                responseDataTemp.push({
                                                    username: item.username,
                                                    avtFilePath: item.avt_file_path,
                                                    name: item.name,
                                                    dob: item.dob,
                                                }),
                                            );
                                            responseData.friend = [...responseData.friend, ...responseDataTemp];
                                            res.send(responseData);
                                        });
                                    });
                                });
                        });
                    });
                });
            });
        });
    } catch (err) {
        res.status(500).send(`Error due to ${err}`);
    }
};
