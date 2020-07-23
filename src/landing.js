import React from "react";
import Registration from "./registration";
import Login from "./login";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="landing-container-top">
            <div className="landing-top-left landing-child">
                <h1 className="h1-landing">My private cook</h1>
            </div>
            <div className="landing-top-right landing-child">
                <BrowserRouter>
                    <Route exact path="/" render={() => <Registration />} />
                    <Route path="/login" render={() => <Login />} />
                </BrowserRouter>
            </div>
        </div>
    );
}
