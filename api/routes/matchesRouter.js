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
 * Example: .../filter?name=ezreal&position=adc&outcome=win
 */
router.get('/filter', MatchesController.getChampionMatchesListFilters);

module.exports = router;
