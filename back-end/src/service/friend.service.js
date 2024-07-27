const db = require('../model');
const Friend = db.friend;
const Friendship = db.friendship;
const User = db.user;
const { Op, where } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const SeverService = require('./sever.service');
const UserSeverService = require('./userSever.service');
const ChannelService = require('./channel.service');

exports.create = async (req, res) => {
    try {
        return User.findOne({
            where: {
                username: req.body.usernameReceiver,
            },
        }).then(async (result) => {
            if (!result) res.status(201).send('User not found');
            else {
                const responseUserData = {
                    username: result.username,
                    avtFilePath: result.avt_file_path,
                    name: result.name,
                    dob: result.dob,
                };
                const newFriend = {
                    friend_id: `friend${req.body.usernameSender}${req.body.usernameReceiver}`,
                    status: 'pending',
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
                            friendId: newFriend.friend_id,
                            ...responseUserData,
                        };
                        res.status(200).send(responseData);
                    });
                });
            }
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
        let globalFriendId = [];
        return Friendship.findAll({
            where: {
                sender: username,
            },
        }).then((result) => {
            const friendIds = [];
            result?.map((item) => {
                friendIds.push(item.friend_id);
                globalFriendId.push(item.friend_id);
            });
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
                    result.map((item, index) =>
                        responseDataTemp.push({
                            username: item.username,
                            avtFilePath: item.avt_file_path,
                            name: item.name,
                            dob: item.dob,
                            friendId: globalFriendId[index],
                        }),
                    );
                    for (let i = 0; i < responseDataTemp.length; i++) globalFriendId.shift();
                    responseData.requestSend = responseDataTemp;
                    return User.findAll({
                        where: {
                            username: {
                                [Op.in]: friendUsernames,
                            },
                        },
                    }).then((result) => {
                        const responseDataTemp = [];
                        result.map((item, index) =>
                            responseDataTemp.push({
                                username: item.username,
                                avtFilePath: item.avt_file_path,
                                name: item.name,
                                dob: item.dob,
                                friendId: globalFriendId[index],
                            }),
                        );
                        responseData.friend = responseDataTemp;
                        Friend.findAll({
                            where: {
                                receiver: username,
                            },
                        }).then((result) => {
                            result.map((item) => {
                                if (item.status === 'pending') {
                                    friendIdReceiver.push(item.friend_id);
                                    globalFriendId.push(item.friend_id);
                                } else if (item.status === 'friend') {
                                    friendIdFriend.push(item.friend_id);
                                    globalFriendId.push(item.friend_id);
                                }
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
                                    result.map((item, index) =>
                                        responseDataTemp.push({
                                            username: item.username,
                                            avtFilePath: item.avt_file_path,
                                            name: item.name,
                                            dob: item.dob,
                                            friendId: globalFriendId[index],
                                        }),
                                    );
                                    for (let i = 0; i < responseDataTemp.length; i++) globalFriendId.shift();
                                    responseData.requestReceive = responseDataTemp;
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
                                            result.map((item, index) =>
                                                responseDataTemp.push({
                                                    username: item.username,
                                                    avtFilePath: item.avt_file_path,
                                                    name: item.name,
                                                    dob: item.dob,
                                                    friendId: globalFriendId[index],
                                                }),
                                            );
                                            responseData.friend = [...responseData.friend, ...responseDataTemp];
                                            res.status(200).send(responseData);
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

exports.update = async (req, res) => {
    try {
        const uniqueSeverId = uuidv4();
        const responseData = {};
        Friend.update(
            {
                friend_id: `friend${req.body.targetUsername}${req.body.currentUsername}`,
                status: 'friend',
                receiver: `${req.body.currentUsername}`,
            },
            {
                where: {
                    friend_id: `friend${req.body.targetUsername}${req.body.currentUsername}`,
                },
            },
        ).then(() => {
            const newSever = {
                chat_room_id: uniqueSeverId,
                name: 'sever',
                avt_file_path: 'avt',
                room_owner: 'both',
                type: 'PRIVATE_MESSAGE',
            };
            return SeverService.create(newSever).then(() => {
                responseData.newSever = newSever;
                const uniqueCurrentUserSeverId = uuidv4();
                const newCurrentUserSever = {
                    user_sever_id: uniqueCurrentUserSeverId,
                    username: req.body.currentUsername,
                    chat_room_id: uniqueSeverId,
                };
                return UserSeverService.create(newCurrentUserSever).then((result) => {
                    responseData.currentUserSever = newCurrentUserSever;
                    const uniqueTargetUserSeverId = uuidv4();
                    const newTargetUserSever = {
                        user_sever_id: uniqueTargetUserSeverId,
                        username: req.body.targetUsername,
                        chat_room_id: uniqueSeverId,
                    };
                    return UserSeverService.create(newTargetUserSever).then(() => {
                        responseData.TargetUserSever = newCurrentUserSever;
                        const uniqueChannelId = uuidv4();
                        const newChannel = {
                            channel_id: uniqueChannelId,
                            channel_name: 'PRIVATE MESSAGE',
                            sever_id: uniqueSeverId,
                        };
                        return ChannelService.create(newChannel).then(() => {
                            responseData.channel = newChannel;
                            console.log(responseData);
                            res.status(200).send(responseData);
                        });
                    });
                });
            });
        });
    } catch (err) {
        res.status(500).send(`Error due to ${err}`);
    }
};

exports.destroy = async (req, res) => {
    try {
        return Friendship.findOne({
            where: {
                friend_id: req.body.friendId,
            },
        }).then((result) => {
            return Friendship.destroy({
                where: {
                    friendship_id: result.friendship_id,
                },
            })
                .then((result) => {
                    return Friend.destroy({
                        where: {
                            friend_id: req.body.friendId,
                        },
                    });
                })
                .then(() => {
                    res.status(200).send('Delete Succeed!');
                });
        });
    } catch (err) {
        res.status(500).send(`Error due to ${err}`);
    }
};
