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
    if (action.type == "ADD_IMAGE") {
        state = Object.assign({}, state, {
            cooksData: action.uploadData,
        });
    }

    if (action.type == "GET_COMMENTS") {
        state = Object.assign({}, state, {
            getAllComments: action.getAllComments,
        });
    }

    if (action.type == "ADD_COMMENT") {
        state = Object.assign({}, state, {
            getAllComments: state.getAllComments.concat(action.commentData),
        });
    }

    return state;
}
