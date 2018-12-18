const Sequelize = require('sequelize');
const sequelize = require('../dbConnection');

const auidoModel = sequelize.define('auido', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    titleImage: {
        type: Sequelize.STRING,
        default: '/audio_tracks/titleImage/default.jpg'
    },
    author: {
        type: Sequelize.STRING,
        defaultValue: 'undefined author'
    },
    audioPath: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // postedBy: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'user',
        // allowNull: true
    // }
});
module.exports = auidoModel;
