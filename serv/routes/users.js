const express = require('express');
const router = express.Router();
const User = require('../models/user');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const getToken = (user) => {
  const payload = {
    _id: user._id,
    role: user.role,
    sessionId: user.sessionId
  };
  return jwt.sign(payload, require('../secretKey'), {expiresIn: 365 * 24 * 60 * 60});
};

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/public/avatars')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
const upload = multer({
  storage: storage,
  limits: {fileSize: 5 * 1024 * 1024}
});

router.get('/getProfile', async (request, response) => {
  const user = await User.findOne({
    _id: request.user._id,
    role: request.user.role,
    sessionId: request.user.sessionId
  });
  response.send(user);
});

router.post('/signIn', async (request, response) => {
  const user = await User.findOne(request.body);
  const session = await User.findOne(request.body).select('sessionId');
  user.sessionId = session.sessionId;
  response.send(getToken(user));
});

router.post('/signUp', async (request, response) => {
  request.body.sessionId = uuid.v4();
  const user = await User.create(request.body);
  response.send(getToken(user));
});

router.put('/editProfile', upload.single('avatar'), async (request, response) => {
  console.log(request.body);
  response.send(await User.findOneAndUpdate(
      {_id: request.user._id},
      request.body,
      {new: true}
  ));
});

module.exports = router;
