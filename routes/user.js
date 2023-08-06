const express = require('express');
const user = require('../controllers/user');
const asyncMiddleware = require('../middlewares/async');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post(
  '/signup',
  asyncMiddleware((req, res) => user.signUp(req, res))
);

router.post(
  '/login',
  asyncMiddleware((req, res) => user.login(req, res))
);

router.get('/isUserLoggedIn', auth, (req, res) => {
  res.status(200).json({ status: 'success', message: 'logged in' });
});

module.exports = router;
