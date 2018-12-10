const mongoose = require('mongoose');
const audioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    titleImage: {
        type: String,
        default: '/audio_tracks/titleImage/default.jpg'
    },
    author: {
        type: String,
        default: 'undefined author'
    },
    audioPath: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports = mongoose.model('audio', audioSchema);