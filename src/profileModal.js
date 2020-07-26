import axios from "./axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";

export default function ProfileModal() {
    const [no_profile, setNo_profile] = useState("");
    const [name, setName] = useState("");
    const [greeting, setGreeting] = useState("");
    const [submitCook, setSubmitCook] = useState("");
    const [show, setShow] = useState(false);
    const [arrow, setArrow] = useState(
        <i className="fas fa-angle-double-left"> </i>
    );

    useEffect(() => {
        (async () => {
            const profile = await axios.get(`/profile`);
            if (profile.data == "no_profile" || profile.data.rows.length == 0) {
                setArrow("");
                return setNo_profile("Register to interact");
            }
            setName(profile.data.rows[0].first);
            setGreeting("Hello");
        })();
    }, []);

    const submitModal = (e) => {
        e.preventDefault();

        axios
            .post("/submitCook", submitCook)
            .then(function (cookData) {
                console.log(cookData);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setSubmitCook({ ...submitCook, [e.target.name]: e.target.value });
    };

    const showModal = () => {
        if (show == true) {
            setArrow(<i className="fas fa-angle-double-left"> </i>);
            return setShow(false);
        }
        setShow(true);
        setArrow(<i className="fas fa-angle-double-right"></i>);
    };

    return (
        <div className="modal">
            <button className="showModalButton" onClick={showModal}>
                {arrow}
            </button>

            <span className="profile-name">
                <BrowserRouter forceRefresh={true}>
                    <Link className="profile-login-link" to="/">
                        {no_profile}
                    </Link>
                </BrowserRouter>
                {greeting} {name}
            </span>

            {show ? (
                <span className="modalForm-container">
                    <form
                        className="modalForm"
                        onSubmit={(e) => submitModal(e)}
                    >
                        <h2 className="modaltitle">
                            Tell us a little bit more about yourself:
                        </h2>
                        <div className="label-container">
                            <span>National Cuisine</span>
                        </div>
                        <input
                            required
                            type="text"
                            name="national_cuisine"
                            placeholder="National Cuisine"
                            onChange={(e) => handleChange(e)}
                        />
                        <br />
                        <div className="label-container">
                            <span>Specialties</span>
                        </div>
                        <input
                            required
                            type="text"
                            name="specialties"
                            placeholder="Specialties"
                            onChange={(e) => handleChange(e)}
                        />
                        <br />
                        <div className="label-container">
                            <span>Experience</span>
                        </div>
                        <textarea
                            type="text"
                            name="experiences"
                            placeholder="Your cooking skills"
                            onChange={(e) => handleChange(e)}
                        />
                        <br />
                        <div className="label-container">
                            <span>Cook on site</span>
                        </div>
                        <select
                            onChange={(e) => handleChange(e)}
                            name="cook_on_site"
                            placeholder="Cook on site"
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <br />
                        <div className="label-container">
                            <span>Shopping food</span>
                        </div>
                        <select
                            onChange={(e) => handleChange(e)}
                            name="shopping_food"
                            placeholder="Shopping food"
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <br />
                        <div className="label-container">
                            <span>Deliver</span>
                        </div>
                        <select
                            onChange={(e) => handleChange(e)}
                            name="delivery"
                            placeholder="Delivery"
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <br />
                        <div className="label-container">
                            <span>Hourly wage</span>
                        </div>
                        <input
                            required
                            type="text"
                            name="hourly_wage"
                            placeholder="Hourly wage"
                            onChange={(e) => handleChange(e)}
                        />
                        <input
                            className="registerButton"
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </span>
            ) : (
                <span></span>
            )}
        </div>
    );
}
