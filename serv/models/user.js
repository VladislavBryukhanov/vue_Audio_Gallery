const mongoose = require('mongoose');
const ROLE = {
    USER: 'USER'
}

const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        select: false,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        required: true,
        default: ROLE.USER
    }
});

module.exports = mongoose.model('User', userSchema);