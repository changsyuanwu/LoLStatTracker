const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/indexController.js');

/* GET starter page. */
router.get('/starter', IndexController.getStarter);

/* GET home page. */
router.get('/', IndexController.getHome);

module.exports = router;