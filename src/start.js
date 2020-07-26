import React from "react";
import ReactDOM from "react-dom";
import Landing from "./landing";
import App from "./app";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname === "/") {
    elem = <Landing />;
} else if (location.pathname === "/login") {
    elem = <Landing />;
} else {
    elem = (
        <Provider store={store}>
            <App />;
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
