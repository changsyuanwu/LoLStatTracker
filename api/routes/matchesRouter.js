const express = require('express');
const { ensureAuthenticated } = require('../auth/auth.js');
const MatchesController = require('../controllers/matchesController');
const router = express.Router();

/* GET all matches */
router.get('/', MatchesController.getMatches);

/* GET matches with query list parameters:
 *   name: name of the champion being queried, non-null
 *   position: ONE OF [all, top, jungle, mid, adc, support]
 *   outcome: ONE OF [all, win, loss]
 *   patch: patch version [e.g., 11.0]. Periods may need to be escaped (use %2E)
 * All query values are optional.
 * 
 * Example: .../matches/filter?name=ezreal&position=adc&outcome=win&patch=11%2E0
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
 *   patch: patch version [e.g., 11.0]. Periods may need to be escaped (use %2E)
 * All body values are mandatory.
 */
//router.post('/new', ensureAuthenticated, MatchesController.postNewMatch);
router.post('/new', MatchesController.postNewMatch);

/* PUT updated details for an existing match:
 * Body requires same fields as POST new match details. 
 */
//router.put('/edit/:matchID', ensureAuthenticated, MatchesController.updateMatch);
router.put('/edit/:matchID', MatchesController.updateMatch);

/* DELETE an existing match:
 *   matchID: the ID of the match to be deleted. The authenticated user must
 *            own the match in question. Mandatory field.
 */
//router.delete('/delete/:matchID', ensureAuthenticated, MatchesController.deleteMatch);
router.delete('/delete/:matchID', MatchesController.deleteMatch);

module.exports = router;
