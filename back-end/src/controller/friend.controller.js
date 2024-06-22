module.exports = (app) => {
    const friendService = require('../service/friend.service');
    var router = require('express').Router();

    router.post('/add-friend', friendService.create);
    router.post('/get-friend-data', friendService.retrieve);

    app.use('/', router);
};
