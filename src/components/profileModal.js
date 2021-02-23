import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axios from "../axios";

import { useDispatch, useSelector } from "react-redux";
import { getCooks } from "../redux/actions";

import Comments from "./comments";

export default function profileModal(modal) {
    const dispatch = useDispatch();
    const cooksData = useSelector((state) => state && state.cooksData);
    const [show, setShow] = useState(false);
    const [commentId, setCommentId] = useState(0);
    const [cookModal, setCookModal] = useState([]);

    useEffect(() => {
        dispatch(getCooks());
    }, []);

    if (!cooksData) {
        return null;
    }

    if (modal && modal.openModalId.id != "") {
        const id = modal.openModalId.id;
        (async () => {
            const cook = await axios.get(`/getCookModal/` + id);
            setCookModal(cook);
        })();
        modal.openModalId.id = "";
        setCommentId(id);
        setShow(true);
    }

    const myCookHide = () => {
        setShow(false);
    };

    const defaultImg = (e) => {
        e.target.src = "/images/default.jpg";
    };

    return (
        <div>
            {show && cookModal.length != 0 && (
                <div className="my-cook-modal">
                    <div className="my-cook-modal-child inline">
                        <div className="modal-details-container">
                            <span className="profileName-modal">
                                {cookModal.data.rows[0].first}{" "}
                                {cookModal.data.rows[0].last}
                            </span>
                            <span className="profileEmail-modal">
                                <span className="modal-details-heighlight">
                                    <i className="fas fa-envelope"></i>{" "}
                                    <b>Email: </b>
                                </span>
                                {cookModal.data.rows[0].email}
                            </span>
                            <span className="profileWage-modal">
                                <span className="modal-details-heighlight">
                                    <i className="fas fa-money-bill-wave"></i>{" "}
                                    <b>Wage/hour: </b>
                                </span>
                                {cookModal.data.rows[0].hourly_wage}
                            </span>

                            <span className="profileCuisine-modal">
                                <span className="modal-details-heighlight">
                                    <i className="fas fa-utensils"></i>{" "}
                                    <b>National cuisine: </b>
                                </span>
                                {cookModal.data.rows[0].national_cuisine}
                            </span>

                            <span className="profileSpecialties-modal">
                                <span className="modal-details-heighlight">
                                    <i className="fas fa-hamburger"></i>{" "}
                                    <b>Specialties: </b>
                                </span>
                                {cookModal.data.rows[0].specialties}
                            </span>

                            <span className="profileCookOnSite-modal">
                                <span className="modal-details-heighlight">
                                    <i className="fas fa-home"></i>{" "}
                                    <b>Cook on site: </b>
                                </span>
                                {cookModal.data.rows[0].cook_on_site}
                            </span>

                            <span className="profileShopping-modal">
                                <span className="modal-details-heighlight">
                                    <i className="fas fa-shopping-cart"></i>{" "}
                                    <b>Shopping groceries: </b>
                                </span>
                                {cookModal.data.rows[0].shopping_food}
                            </span>

                            <span className="profileDelivery-modal">
                                <span className="modal-details-heighlight">
                                    <i className="fas fa-truck"></i>{" "}
                                    <b>Delivery: </b>
                                </span>
                                {cookModal.data.rows[0].delivery}
                            </span>

                            <span className="profileExperiences-modal">
                                <span className="modal-details-heighlight">
                                    <i className="fas fa-star"></i>{" "}
                                    <b>Experience: </b>
                                </span>
                                {cookModal.data.rows[0].experiences}
                            </span>
                        </div>
                    </div>
                    <div className="my-cook-modal-child inline">
                        <Route
                            path="/my-cooks"
                            render={() => <Comments id={commentId} />}
                        />
                    </div>

                    <div className="my-cook-modal-child">
                        <i
                            className="fas fa-chevron-down"
                            onClick={myCookHide}
                        ></i>
                        <div className="image-gallery-container">
                            {/* ////////// IMAGES ///////////// */}
                            <div className="image-gallery-child">
                                {" "}
                                <img
                                    src={
                                        cookModal.data.rows[0].image1
                                            ? cookModal.data.rows[0].image1
                                            : "/images/default.jpg"
                                    }
                                    onError={(e) => defaultImg(e)}
                                    className="image-gallery-image onscreen"
                                />
                                <img
                                    src={
                                        cookModal.data.rows[0].image2
                                            ? cookModal.data.rows[0].image2
                                            : "/images/default.jpg"
                                    }
                                    onError={(e) => defaultImg(e)}
                                    className="image-gallery-image"
                                />
                                <img
                                    src={
                                        cookModal.data.rows[0].image3
                                            ? cookModal.data.rows[0].image3
                                            : "/images/default.jpg"
                                    }
                                    onError={(e) => defaultImg(e)}
                                    className="image-gallery-image"
                                />
                                <img
                                    src={
                                        cookModal.data.rows[0].image4
                                            ? cookModal.data.rows[0].image4
                                            : "/images/default.jpg"
                                    }
                                    onError={(e) => defaultImg(e)}
                                    className="image-gallery-image"
                                />
                                <img
                                    src={
                                        cookModal.data.rows[0].image5
                                            ? cookModal.data.rows[0].image5
                                            : "/images/default.jpg"
                                    }
                                    onError={(e) => defaultImg(e)}
                                    className="image-gallery-image"
                                />
                            </div>
                            {/* //////////////////////////////////// */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
