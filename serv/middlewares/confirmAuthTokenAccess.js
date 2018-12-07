const User = require('../models/user');

const confirmAuthTokenAccess = (unless) => {
    return async (request, response, next) => {
        console.log( request.user);
        if(unless.includes(request.path)) {
            next();
        }
        if(await User.findOne({
            _id: request.user._id,
            role: request.user.role,
            sessionId: request.user.sessionId
        })) {
            next();
        } else {
            response.sendStatus(403);
        }
    }
};

module.exports = confirmAuthTokenAccess;