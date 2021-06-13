const express = require('express');
const router = express.Router();

const ChampionsController = require('../controllers/championsController.js');

/* GET champion base stats by name */
router.get('/stats/:name', ChampionsController.getChampionStatsByName);

/* GET champion play stats (winrate, playrate, num matches won, num matches played) by name */
router.get('/play-stats/:name', ChampionsController.getChampionPlayStatsByName);

/* GET a list of champion names in an array */
router.get('/list', ChampionsController.getChampionNamesList);

router.post('/update-stats', ChampionsController.updateChampionBaseStats);

module.exports = router;
