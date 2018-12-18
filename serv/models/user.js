const Sequelize = require('sequelize');
const sequelize = require('../dbConnection');

const ROLE = {
    USER: 'USER'
}

const userModel = sequelize.define('user', {
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        select: false,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sessionId: {
        type: Sequelize.STRING,
        select: false,
        allowNull: false
    },
    bio: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ROLE.USER
    }
});

module.exports = userModel;
