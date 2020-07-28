import React from "react";
import Cooks from "./my-cooks";
import ProfileModal from "./profileModal";

import { BrowserRouter, Route } from "react-router-dom";

export default function App() {
    return (
        <div className="app-container">
            <BrowserRouter>
                <Route path="/my-cooks" render={() => <Cooks />} />
                <Route path="/my-cooks" render={() => <ProfileModal />} />
            </BrowserRouter>
        </div>
    );
}
