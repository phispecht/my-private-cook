import React from "react";
import Registration from "./registration";
import Login from "./login";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="landing-container-top">
            <div className="landing-top-left landing-child">
                <h1 className="h1-landing">My private cook</h1>
                <p className="landing-text">
                    Here you have the opportunity to share your home made dishes
                    and earn money. Or just do it the other way round and find
                    the right private cook for your little party at home for the
                    right money - just stress-free.
                </p>
                <BrowserRouter forceRefresh={true}>
                    <span className="underline-color">
                        <Link className="cook-link" to="/my-cooks">
                            <span className="landingButton">&gt;Start Now</span>
                        </Link>
                    </span>
                </BrowserRouter>
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
