import axios from "axios";

const api =  "http://localhost:9000/";

class matches {
    getall() {
        const res = axios.get(api + 'matches/');
        console.log(res);
        return res;
    }
    getallfilter() {
        const res = axios.get(api + 'matches/filter');
         console.log(res);
         return res;
    }
    postmatch(data){
        axios.post('/new', {data});
    }
}

export default new matches;

/* GET champion base stats by name */
//router.get('/stats/:name', ChampionsController.getChampionStatsByName);

/* GET champion play stats (winrate, playrate, num matches won, num matches played) by name */
//router.get('/play-stats/:name', ChampionsController.getChampionPlayStatsByName);

/* GET a list of champion names in an array */
//router.get('/list', ChampionsController.getChampionNamesList);

/* POST to change the base stats of a champion 
 *   name: name of the champion that is being edited
 *   stat: name of the stat being edited
 *   value: value to set the stat to
 *
 * Example: .../champions/update-stats?name=ezreal&stat=mana&value=1
 */
//router.post('/update-stats', ChampionsController.updateChampionBaseStats);

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
//router.post('/new', MatchesController.postNewMatch);


// "matches will be changed to 'data' 
// after we implement the other features as well"
