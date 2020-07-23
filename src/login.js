import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";

export default function Login() {
    const [login, setLogin] = useState("");
    const [error, setError] = useState("");

    const submitLogin = (e) => {
        e.preventDefault();

        axios
            .post(`/login`, login)
            .then(function (login) {
                if (login.data == "error") {
                    return setError("Email or password wrong.");
                }
                location.replace("/my-cooks");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form className="loginForm" onSubmit={(e) => submitLogin(e)}>
                <h2 className="logintitle">Login:</h2>
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
                <input className="loginButton" type="submit" value="Submit" />
                {/* <Link className="loginLink" to="/reset">
                        &gt; Forgot your password? Click here!
                    </Link> */}
                <br></br>
                <span className="error">{error}</span>
            </form>
        </div>
    );
}
