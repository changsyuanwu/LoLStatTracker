const initial = {
    data: []
}
  
const roots = (state = initial, action) => {
    switch (action.type) {
        case "ALL":
            //console.log(action);
            return Object.assign({ data: action.data });
        case "MERGED":
            let joined = state.data.concat(action.data);
            return Object.assign({ data: joined });
        default:
            return state;
    }
};
  
  export default roots;