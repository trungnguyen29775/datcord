module.exports = (app) => {
    const SeverService = require('../service/sever.service');
    var router = require('express').Router();

    router.post('/get-sever-data', SeverService.getSeverData);
    app.use('/', router);
};
