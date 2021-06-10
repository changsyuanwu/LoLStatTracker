const express = require('express');
const router = express.Router();

const ChampionsController = require('../controllers/championsController.js');

/* GET champion by name */
router.get('/:name', ChampionsController.getChampionByName);

/* GET champion winrate by name */
router.get('/winrate/:name', ChampionsController.getChampionWinRateByName);

module.exports = router;
