const db = require('../model');
const UserSever = db.userSever;

exports.create = async (req, res) => {
    try {
        const newUserSever = {
            username: req.body.email,
        };

        const checkName = await UserSever.findOne({ where: { username: newUser.username } });
        if (checkName) {
            res.send('The username already exist.');
        } else {
            await UserSever.create(newUserSever);
            const responseData = {
                username: newUser.username,
                status: 'succeed',
            };
            res.send(responseData);
        }
    } catch (err) {
        res.status(500).send(`Error due to ${err}`);
    }
};
