const express = require('express');
const MatchController = require('../controllers/matchController');
const router = express.Router();

// GET list of matches where [champion-name] has played
router.get('/all/:name', MatchController.getChampionMatchesListByName);

// GET list of matches where [champion-name] has won
router.get('/win/:name',
           MatchController.getChampionWinningMatchesListByName);

// GET list of matches where [champion-name] has lost
router.get('/loss/:name',
           MatchController.getChampionLosingMatchesListByName);

module.exports = router;