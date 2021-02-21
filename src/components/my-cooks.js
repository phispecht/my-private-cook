import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCooks } from "../redux/actions";

import ProfileModal from "./profileModal";
import UploaderModal from "./addCooks";

// this page gives an overview of all cooks registered on my private cook

export default function Cooks() {
    const dispatch = useDispatch();
    const cooksData = useSelector((state) => state && state.cooksData);
    const [cookId, setCookId] = useState(0);

    useEffect(() => {
        dispatch(getCooks());
    }, []);

    if (!cooksData) {
        return null;
    }

    const myCookShow = (e) => {
        setCookId({
            id: e.currentTarget.id,
        });
    };

    const defaultImg = (e) => {
        e.target.src = "/images/default.jpg";
    };

    return (
        <div className="my-cooks-container">
            <UploaderModal />
            <div className="profileModal-container">
                {cookId != 0 && cookId != undefined && (
                    <ProfileModal openModalId={cookId} />
                )}
            </div>
            <Link className="h1-link" to="/">
                <h1 className="h1-cooks">My private cook</h1>
            </Link>
            <div className="my-cooks-container-child">
                {cooksData &&
                    cooksData.map((cook) => (
                        <div
                            className="my-cook"
                            id={cook.id}
                            key={cook.id}
                            onClick={(e) => myCookShow(e)}
                        >
                            <div className="my-cook-element">
                                <img
                                    src={
                                        cook.image1
                                            ? cook.image1
                                            : "/images/default.jpg"
                                    }
                                    onError={(e) => defaultImg(e)}
                                    className="profilePic-screen"
                                />
                            </div>
                            <div className="my-cook-element">
                                <div className="profileName-screen">
                                    {cook.first} {cook.last}
                                </div>
                                <div className="profileCuisine-screen">
                                    {cook.national_cuisine}
                                </div>
                                <div className="my-cook-element-details">
                                    <span className="profileCookOnSite-screen my-cook-element-details-child">
                                        <i className="fas fa-home"></i>{" "}
                                        <b>Cook on site: </b>
                                        <span>{cook.cook_on_site}</span>
                                    </span>
                                    <span className="profileShopping-screen my-cook-element-details-child">
                                        <i className="fas fa-shopping-cart"></i>{" "}
                                        <b>Shopping groceries: </b>
                                        <span>{cook.shopping_food}</span>
                                    </span>
                                    <span className="profileDelivery-screen my-cook-element-details-child">
                                        <i className="fas fa-truck"></i>{" "}
                                        <b>Delivery: </b>
                                        <span>{cook.delivery}</span>
                                    </span>
                                    <span className="profileWage-screen my-cook-element-details-child">
                                        <i className="fas fa-money-bill-wave"></i>{" "}
                                        <b>Wage/hour: </b>
                                        <span>{cook.hourly_wage}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <footer>
                <div className="footer-logo">My private cook</div>
                <span className="developer">
                    <span> philippspecht1990@gmail.com</span>
                    <span> by Philipp Specht</span>
                </span>
            </footer>
        </div>
    );
}
