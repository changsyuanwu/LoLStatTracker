const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/indexController.js');

/* GET index */
router.get('/', IndexController.getIndex);

router.get('/test-query', IndexController.getTestQuery);

router.get('/anze-test-query', IndexController.getAnzeTestQuery);

module.exports = router;
