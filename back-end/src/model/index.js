const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// Model
db.user = require('./user.model')(sequelize, Sequelize);
db.friend = require('./friend.model')(sequelize, Sequelize);
db.friendship = require('./friendship.model')(sequelize, Sequelize);
db.message = require('./message.model')(sequelize, Sequelize);
db.sever = require('./sever')(sequelize, Sequelize);
db.userSever = require('./userSever.model')(sequelize, Sequelize);
//----------------------Relation-----------------------------

module.exports = db;
