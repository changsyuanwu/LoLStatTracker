const express = require('express');
const MatchController = require('../controllers/matchController');
const router = express.Router();

/* GET all matches */
router.get('/', MatchController.getMatches);

/* GET matches with query list parameters:
 *   name: name of the champion being queried, non-null
 *   position: ONE OF [all, top, jungle, mid, adc, support]
 *   outcome: ONE OF [all, win, loss]
 * 
 * Example: .../filter?name=ezreal&position=adc&outcome=win
 */
router.get('/filter', MatchController.getChampionMatchesListFilters);

module.exports = router;