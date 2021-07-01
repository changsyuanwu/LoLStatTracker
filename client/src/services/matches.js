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
}


export default new matches;

// "matches will be changed to 'data' 
// after we implement the other features as well"

