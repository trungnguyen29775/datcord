module.exports = (app) => {
    const userService = require('../service/user.service');
    var router = require('express').Router();

    router.post('/login', userService.login);
    router.post('/register', userService.register);
    router.put('/update-info', userService.updateInfo);
    app.use('/', router);
};
