const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const usersRouter = require('./routes/users');
const audioRouter = require('./routes/audio');

const initRelations = require('./models/relations');
initRelations(true);
// const sequelize = require('./dbConnection');

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
app.use('/audio', audioRouter);

module.exports = app;
