import React from "react";
import LandingPage from "./components/landing";
import Cooks from "./components/my-cooks";

import { Route } from "react-router-dom";

export default function App() {
    return (
        <div className="app-container">
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/sign-up" component={LandingPage} />
            <Route path="/my-cooks" component={Cooks} />
        </div>
    );
}
