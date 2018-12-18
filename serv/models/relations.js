// const sequelize = require('sequelize');
const User = require('./user');
const Audio = require('./audio');

module.exports = (force) => {
    User.sync(force);
    Audio.sync(force);
}
