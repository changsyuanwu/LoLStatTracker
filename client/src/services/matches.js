import axios from "axios";

const api =  "http://localhost:9000/";

class matches {
    getall() {
       const res = axios.get(api + 'matches/');
        console.log(res);
        return res;
    }

}
export default new matches;

