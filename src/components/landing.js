import React from "react";
import Login from "./login";
import Registration from "./registration";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="landing-container-top">
            <div className="landing-top-left landing-child">
                <h1 className="h1-landing">My private cook</h1>
                <span className="landing-text">
                    On my private cook you can share your home made dishes and
                    earn money.<br></br> You also can do it the other way around
                    and find the right private cook for your party at home, for
                    your kids or for yourself - just stress-free.
                    <span className="underline-color">
                        <BrowserRouter forceRefresh={true}>
                            <Link to="/my-cooks" className="cook-link">
                                <span className="landingButton">Start Now</span>
                            </Link>
                        </BrowserRouter>
                    </span>
                </span>
            </div>
            <div className="landing-top-right landing-child">
                <Route path="/sign-up">
                    <Registration />
                </Route>
                <Route exact path="/">
                    <Login />
                </Route>
            </div>
        </div>
    );
}
