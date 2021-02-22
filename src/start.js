import React from "react";
import ReactDOM from "react-dom";
import Landing from "./components/landing";
import App from "./app";

import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname === "/") {
    elem = <Landing />;
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(
    <BrowserRouter>{elem}</BrowserRouter>,
    document.querySelector("main")
);
