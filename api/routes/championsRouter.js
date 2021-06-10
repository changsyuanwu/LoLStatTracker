const express = require('express');
const router = express.Router();

const ChampionsController = require('../controllers/championsController.js');

/* GET champion by name */
router.get('/:name', ChampionsController.getChampionByName);

module.exports = router;
