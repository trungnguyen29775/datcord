module.exports = (app) => {
    const userService = require('../service/user.service');
    var router = require('express').Router();

    router.post('/signin', userService.login);
    router.post('/signup', userService.signup);
    router.put('/update-info', userService.updateInfo);
    app.use('/', router);
};
