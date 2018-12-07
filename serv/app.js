const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const usersRouter = require('./routes/users');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shop', {useNewUrlParser: true});

const unless = [
    '/auth/signIn',
    '/auth/signUp'
];
const exjwt = require('express-jwt');
const jwtMW = exjwt({
    secret: require('./secretKey'),
}).unless({path: unless});
const confirmAuthTokenAccess = require('./middlewares/confirmAuthTokenAccess')(unless);

app.use(cors({origins: '*'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwtMW);
app.use(confirmAuthTokenAccess);
app.use('/auth', usersRouter);

module.exports = app;
