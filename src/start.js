import React from "react";
import ReactDOM from "react-dom";
import Landing from "./landing";
import App from "./app";

let elem;
if (location.pathname === "/") {
    elem = <Landing />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
