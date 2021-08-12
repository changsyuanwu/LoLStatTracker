const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../auth/auth.js');
const UsersController = require('../controllers/usersController.js');

/* PUT to change password service */
router.put('/change-password', ensureAuthenticated, UsersController.putChangePassword);

/* POST to login/authentication service */
router.post('/authenticate',
  passport.authenticate('local'),
  (req, res, next) => {
    console.log(req.user);
    res.status(200).json({
      message: "success"
    });
  });

/* POST to Add User Service */
router.post('/register', UsersController.postRegister);

/* POST to logout service */
router.post('/logout', UsersController.postLogout);

module.exports = router;