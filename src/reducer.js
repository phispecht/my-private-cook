export default function (state = {}, action) {
    if (action.type == "GET_COOKS") {
        state = Object.assign({}, state, {
            cooksData: action.cooksData,
        });
    }
    return state;
}
