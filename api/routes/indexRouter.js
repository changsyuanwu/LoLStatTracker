const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/indexController.js');

/* GET index */
router.get('/', IndexController.getIndex);

router.get('/test-query', IndexController.getTestQuery);

module.exports = router;
