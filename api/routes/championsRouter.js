const express = require('express');
const router = express.Router();

const ChampionsController = require('../controllers/championsController.js');

/* GET champion base stats by name */
router.get('/stats/:name', ChampionsController.getChampionStatsByName);

/* GET champion play stats (winrate, playrate, num matches won, num matches played) by name */
router.get('/play-stats/:name', ChampionsController.getChampionPlayStatsByName);

/* GET a list of champion names in an array */
router.get('/list', ChampionsController.getChampionNamesList);

/* PUT to change the base stats of a champion 
 *   name: name of the champion that is being edited
 *   stat: name of the stat being edited
 *   value: value to set the stat to
 *
 * Example: .../champions/update-stats?name=ezreal&stat=mana&value=1
 */
router.put('/update-stats', ChampionsController.updateChampionBaseStats);

module.exports = router;
