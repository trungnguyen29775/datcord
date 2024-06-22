const db = require('../model');
const Friend = db.friend;
const Friendship = db.friendship;

exports.create = async (req, res) => {
    try {
        const newFriend = {
            status: 'pending',
            username: req.body.usernameSender,
        };

        const checkFriend = await Friend.findOne({ where: { username: newFriend.username } });
        if (checkFriend) {
            res.send('The username already exist.');
        } else {
            await Friend.create(checkFriend)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    res.status(500).send(`Error due to ${err}`);
                });

            const responseData = checkFriend;
            res.send(responseData);
        }
    } catch (err) {
        res.status(500).send(`Error due to ${err}`);
    }
};
