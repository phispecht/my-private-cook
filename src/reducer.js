export default function (state = {}, action) {
    if (action.type == "GET_COOKS") {
        state = Object.assign({}, state, {
            cooksData: action.cooksData,
        });
    }
    if (action.type == "ADD_COOK") {
        state = Object.assign({}, state, {
            cooksData: action.cookData,
        });
    }
    return state;
}
