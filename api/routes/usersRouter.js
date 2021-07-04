const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth.js');
const UsersController = require('../controllers/usersController.js');

/* PUT to change password service */
router.put('/change-password', ensureAuthenticated, UsersController.postChangePassword);

/* POST to login/authentication service */
router.post('/authenticate',
  passport.authenticate('local'),
  (req, res, next) => {
  });

/* POST to Add User Service */
router.post('/register', UsersController.postRegister);

module.exports = router;