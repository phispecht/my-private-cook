import axios from "../axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCook } from "../redux/actions";
import Uploader from "../uploader";

// modal to add new cooks to the page

export default function addCooks() {
    const [no_profile, setNo_profile] = useState("");
    const [name, setName] = useState("");
    const [greeting, setGreeting] = useState("");
    const [submitCook, setSubmitCook] = useState("");
    const [show, setShow] = useState(false);
    const [arrow, setArrow] = useState(<i className="fas fa-chevron-left"></i>);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const profile = await axios.get(`/profile`);
            if (profile.data == "no_profile" || profile.data.rows.length == 0) {
                setArrow("");
                return setNo_profile("Sign up");
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
                dispatch(addCook(cookData.data.rows));
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
            setArrow(<i className="fas fa-chevron-left"></i>);
            return setShow(false);
        }
        setShow(true);
        setArrow(<i className="fas fa-chevron-right"></i>);
    };

    return (
        <div className="modal">
            <div className="modalName-container">
                <button className="showModalButton" onClick={showModal}>
                    {arrow}
                </button>

                <span className="profile-name">
                    {no_profile != "" ? (
                        <Link className="profile-login-link" to="/sign-up">
                            <i className="fas fa-user-plus"></i> {no_profile}
                        </Link>
                    ) : (
                        <i className="far fa-user-circle"></i>
                    )}
                    {greeting} {name}
                </span>
            </div>

            {show && (
                <span className="modalForm-container">
                    <form
                        className="modalForm"
                        onSubmit={(e) => submitModal(e)}
                    >
                        <h2 className="modaltitle">
                            Tell us a bit more about yourself
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
                            type="number"
                            name="hourly_wage"
                            placeholder="Hourly wage"
                            onChange={(e) => handleChange(e)}
                        />
                        <input
                            className="addCook-button"
                            type="submit"
                            value="Submit"
                        />
                        <BrowserRouter>
                            <Route
                                path="/my-cooks"
                                render={() => <Uploader />}
                            />
                        </BrowserRouter>
                    </form>
                </span>
            )}
        </div>
    );
}
