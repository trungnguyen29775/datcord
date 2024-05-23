const express = require('express');
const port = 5000;
const app = express();
const db = require('./model/index');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// db.sequelize.sync({ alter: true });

require('./controller/user.controller')(app);

app.listen(port, () => {
    console.log('App listen on port ', port);
});
