import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCooks } from "./actions";
import axios from "axios";

export default function Cooks() {
    const dispatch = useDispatch();
    const cooksData = useSelector((state) => state && state.cooksData);
    const [show, setShow] = useState(false);
    const [cookId, setCookId] = useState(0);
    const [cookModal, setCookModal] = useState([]);

    useEffect(() => {
        dispatch(getCooks());
    }, []);

    if (!cooksData) {
        return null;
    }

    const myCookShow = (e) => {
        setCookId({
            [e.target.name]: e.target.value,
        });
    };

    if (cookId) {
        const id = cookId.id;

        (async () => {
            const cook = await axios.get(`/getCookModal/` + id);
            setCookModal(cook);
        })();
        setCookId(0);
        setShow(true);
    }

    const myCookHide = () => {
        setShow(false);
    };

    if (show) {
        if (cookModal.length != 0) {
            var myCook = (
                <div className="my-cook-big" key={cookModal.data.rows[0].id}>
                    <i
                        className="fas fa-angle-double-down"
                        onClick={myCookHide}
                    ></i>
                    <div className="inline">
                        <input
                            type="image"
                            src={cookModal.data.rows[0].image1}
                            readOnly
                            name="profilePic"
                            className="profilePic-screen-big"
                        ></input>
                    </div>
                    <div className="inline">
                        <div className="profileName-screen-big">
                            {cookModal.data.rows[0].first}{" "}
                            {cookModal.data.rows[0].last}
                        </div>
                        <div className="profileEmail-screen-big">
                            <b>Email: </b> {cookModal.data.rows[0].email}
                        </div>

                        <div className="profileCuisine-screen-big">
                            <b>National cuisine: </b>
                            {cookModal.data.rows[0].national_cuisine}
                        </div>

                        <div className="profileSpecialties-screen-big">
                            <b>Specialties: </b>
                            {cookModal.data.rows[0].specialties}
                        </div>
                        <div className="profileExperiences-screen-big">
                            <b>Experience: </b>
                            {cookModal.data.rows[0].experiences}
                        </div>
                        <div className="inline-selects">
                            <span className="profileCookOnSite-screen-big select">
                                <b>Cook on site: </b>
                                {cookModal.data.rows[0].cook_on_site}
                            </span>
                            <span className="profileShopping-screen-big select">
                                <b>Shopping groceries: </b>
                                {cookModal.data.rows[0].shopping_food}
                            </span>
                            <span className="profileDelivery-screen-big select">
                                <b>Delivery: </b>
                                {cookModal.data.rows[0].delivery}
                            </span>
                            <span className="profileWage-screen-big select">
                                <b>Wage/hour: </b>
                                {cookModal.data.rows[0].hourly_wage}
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="my-cooks-container">
            <h1 className="h1-cooks">My private cook</h1>
            <div className="my-cooks-container-child">
                {cooksData ? (
                    cooksData.map((cook) => {
                        console.log(cooksData);
                        return (
                            <div className="my-cook" key={cook.id}>
                                <div className="inline">
                                    <input
                                        type="image"
                                        src={cook.image1}
                                        readOnly
                                        name="id"
                                        className="profilePic-screen"
                                        value={cook.id}
                                        onClick={(e) => myCookShow(e)}
                                    ></input>
                                </div>
                                <div className="inline">
                                    <div className="profileName-screen">
                                        {cook.first} {cook.last}
                                    </div>
                                    <div className="profileCuisine-screen">
                                        {cook.national_cuisine}
                                    </div>
                                    <div className="inline-selects">
                                        <span className="profileCookOnSite-screen select">
                                            <b>Cook on site: </b>
                                            {cook.cook_on_site}
                                        </span>
                                        <span className="profileShopping-screen select">
                                            <b>Shopping groceries: </b>
                                            {cook.shopping_food}
                                        </span>
                                        <span className="profileDelivery-screen select">
                                            <b>Delivery: </b> {cook.delivery}
                                        </span>
                                        <span className="profileWage-screen select">
                                            <b>Wage/hour: </b>{" "}
                                            {cook.hourly_wage}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <span></span>
                )}
                {myCook}
            </div>
        </div>
    );
}
