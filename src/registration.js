import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";

export default function Registration() {
    const [registration, setRegistration] = useState("");
    const [error, setError] = useState("");

    const submitRegistration = (e) => {
        e.preventDefault();

        axios
            .post(`/registration`, registration)
            .then(function (registration) {
                if (registration.data == "error") {
                    return setError(
                        "You already registered with this Email, please use another one."
                    );
                }
                location.replace("/my-cooks");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setRegistration({ ...registration, [e.target.name]: e.target.value });
    };

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
                <br></br>
                <span className="error">{error}</span>
            </form>
        </div>
    );
}
