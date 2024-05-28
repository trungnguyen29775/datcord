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
db.channel = require('./channel.model')(sequelize, Sequelize);
//----------------------Relation-----------------------------

// Friendship
db.friendship.belongsTo(db.user, {
    foreignKey: 'user_id',
});

db.user.hasMany(db.friendship, {
    foreignKey: 'user_id',
});

// Message
db.message.belongsTo(db.channel, {
    foreignKey: 'channel_id',
});

db.channel.hasMany(db.message, {
    foreignKey: 'channel_id',
});
// User Sever
db.userSever.belongsTo(db.user, {
    foreignKey: 'user_id',
});

db.user.hasMany(db.userSever, {
    foreignKey: 'user_id',
});
// Sever

db.sever.belongsTo(db.userSever, {
    foreignKey: 'user_sever_id',
});

db.userSever.hasMany(db.sever, {
    foreignKey: 'user_sever_id',
});

// Friend
db.friend.belongsTo(db.friendship, {
    foreignKey: 'friendship_id',
});

db.friendship.hasMany(db.friend, {
    foreignKey: 'friendship_id',
});
// channel
db.channel.belongsTo(db.sever, {
    foreignKey: 'sever_id',
});

db.sever.hasMany(db.channel, {
    foreignKey: 'sever_id',
});

module.exports = db;
