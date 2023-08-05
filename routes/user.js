const express = require('express');
const user = require('../controllers/user');
const asyncMiddleware = require('../middlewares/async');
const router = express.Router();

router.post(
  '/signup',
  asyncMiddleware((req, res) => user.signUp(req, res))
);

router.post(
  '/login',
  asyncMiddleware((req, res) => user.login(req, res))
);

module.exports = router;
