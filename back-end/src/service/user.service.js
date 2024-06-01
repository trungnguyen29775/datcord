const db = require('../model');
const User = db.user;

exports.login = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    const checkName = await User.findOne({ where: { username: user.username } });
    if (checkName) {
        if (user.password === checkName.password) {
            const responseData = {
                name: checkName.name,
                username: checkName.username,
                userId: checkName.user_id,
                avtFilePath: checkName.avt_file_path,
            };
            res.status(200).send(responseData);
        }
    } else {
        res.status(500).send("User name doesn't exist.");
    }
};

exports.signup = async (req, res) => {
    try {
        const newUser = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            user_id: req.body.userId,
        };

        const checkName = await User.findOne({ where: { username: newUser.username } });
        if (checkName) {
            res.send('The username already exist.');
        } else {
            await User.create(newUser);
            const responseData = {
                name: newUser.name,
                username: newUser.username,
            };
            res.send(responseData);
        }
    } catch (err) {
        res.status(500).send(`Error due to ${err}`);
    }
};

exports.updateInfo = async (req, res) => {
    try {
        await User.update(
            {
                username: req.body.username,
                phoneNum: req.body.phoneNum,
                name: req.body.name,
            },
            {
                where: {
                    user_id: req.body.user_id,
                },
            },
        );
        res.status(200).send('Succeed');
    } catch (err) {
        res.status(500).send(`Error due to ${err}`);
    }
};
exports.changePassword = async (req, res) => {
    try {
        await User.update(
            { password: req.body.password },
            {
                where: {
                    username: req.body.username,
                },
            },
        );
        res.send(200)('Updated!');
    } catch (err) {
        console.log('Error due to ', err);
    }
};
