const initial = {
    data: []
}
  
const roots = (state = initial, action) => {
    switch (action.type) {
        case "ALL":
            console.log(action);
            return Object.assign({ data: action.data });
        default:
            return state;
    }
};
  
  export default roots;