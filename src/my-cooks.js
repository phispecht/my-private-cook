import axios from "./axios";
import React, { useState, useEffect } from "react";

export default function Cooks() {
    /* const [registration, setRegistration] = useState("");
    const [error, setError] = useState(""); */

    useEffect(() => {
        (async () => {
            const cookers = await axios.get(`/cooks`);
            console.log(cookers);
        })();
    }, []);

    return (
        <div className="my-cooks-container">
            <h1 className="h1-cooks">My private cooks</h1>
            <div className="my-cooks-container-child"></div>
        </div>
    );
}
