const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/indexController.js');

/* GET home page. */
router.get('/', IndexController.getIndex);

module.exports = router;
