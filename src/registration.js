import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";

export default function FriendButton() {
    const [someValue, setSomeValue] = useState("");

    const submitRegistration = () => {
        axios
            .post(`/registration`)
            .then(function (registration) {
                console.log(registration);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleChange = () => {};

    return (
        <div>
            <form
                className="registrationForm"
                onSubmit={(e) => submitRegistration(e)}
            >
                <h2 className="registertitle">Register Now:</h2>
                <input
                    required
                    type="text"
                    name="first"
                    placeholder="First Name"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    required
                    type="text"
                    name="last"
                    placeholder="Last Name"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    required
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                />
                <input
                    className="registerButton"
                    type="submit"
                    value="Submit"
                />
                <div className="loginRegistration">
                    <Link className="loginLink" to="/login">
                        Log in
                    </Link>
                </div>
            </form>
        </div>
    );
}
