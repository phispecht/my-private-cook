import axios from "./axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, addComment } from "./actions";

export default function Comments({ id }) {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const getAllComments = useSelector(
        (state) => state && state.getAllComments
    );
    let displayComment = "";

    useEffect(() => {
        (async () => {
            dispatch(getComments(id));
        })();
    }, [comment]);

    const sendComment = (e) => {
        e.preventDefault();

        const commentObj = { id, comment };

        axios
            .post("/sendComment", commentObj)
            .then((commentData) => {
                dispatch(addComment(commentData.data.rows));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    console.log("getAllComments:", getAllComments);

    if (getAllComments != undefined) {
        console.log("getAllComments:", getAllComments);
        getAllComments.map((element) => {
            displayComment = element.comment;
        });
    }

    return (
        <div>
            <form className="comment-form" onSubmit={(e) => sendComment(e)}>
                <p>{displayComment}</p> <br />
                <textarea
                    required
                    type="text"
                    name="textareaComment"
                    onChange={(e) => handleChange(e)}
                />
                <div className="button-display-inline">
                    <button
                        name="comment-button"
                        className="comment-button"
                        type="submit"
                    >
                        Comment
                    </button>
                </div>
            </form>
        </div>
    );
}
