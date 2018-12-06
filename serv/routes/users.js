const express = require('express');
const router = express.Router();

router.get('/signIn', function(req, res) {
  res.send('respond with a resource');
});

router.get('/signUp', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
