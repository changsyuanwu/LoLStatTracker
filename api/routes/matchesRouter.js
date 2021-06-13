const express = require('express');
const MatchesController = require('../controllers/matchesController');
const router = express.Router();

/* GET all matches */
router.get('/', MatchesController.getMatches);

/* GET matches with query list parameters:
 *   name: name of the champion being queried, non-null
 *   position: ONE OF [all, top, jungle, mid, adc, support]
 *   outcome: ONE OF [all, win, loss]
 * 
 * Example: .../matches/filter?name=ezreal&position=adc&outcome=win
 */
router.get('/filter', MatchesController.getChampionMatchesListFilters);

/* POST new match details: 
 *   blue_top: [champion name, unique within the team]
 *   blue_jungle: [champion name, unique within the team]
 *   blue_mid: [champion name, unique within the team]
 *   blue_adc: [champion name, unique within the team]
 *   blue_support: [champion name, unique within the team]
 *   red_top: [champion name, unique within the team]
 *   red_jungle: [champion name, unique within the team]
 *   red_mid: [champion name, unique within the team]
 *   red_adc: [champion name, unique within the team]
 *   red_support: [champion name, unique within the team]
 *   result: ONE OF [Red, Blue]
 */
router.post('/new', MatchesController.postNewMatch);

/* PUT new details for an existing match */
//router.put('/edit/:matchID');

module.exports = router;
