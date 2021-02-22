import axios from "./axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addImage } from "./redux/actions";

export default function Uploader() {
    const [files, setFiles] = useState([]);
    const dispatch = useDispatch();

    const upload = (e) => {
        e.preventDefault();

        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            formData.append(`file`, files[i]);
        }

        axios
            .post("/upload", formData)
            .then((upload) => {
                dispatch(addImage(upload.data.rows));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const select = (e) => {
        setFiles(e.target.files);
    };

    return (
        <div className="uploader-modal">
            Uploade up to 5 of your food-images
            <br />
            <div className="upload-buttons-container">
                <label
                    htmlFor="file-upload"
                    className="select-images upload-buttons"
                >
                    1. Select images
                </label>
                <input
                    id="file-upload"
                    onChange={(e) => select(e)}
                    type="file"
                    name="file"
                    accept="image/*"
                    multiple="multiple"
                />
                <button
                    className="upload-button upload-buttons"
                    onClick={(e) => upload(e)}
                >
                    2. Press me to Upload
                </button>
            </div>
        </div>
    );
}
