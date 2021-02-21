import axios from "../axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, addComment } from "../redux/actions";

// the comment section

export default function Comments({ id }) {
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const getAllComments = useSelector(
        (state) => state && state.getAllComments
    );

    useEffect(() => {
        (async () => {
            dispatch(getComments(id));
        })();
    }, [comment, id]);

    const sendComment = (e) => {
        e.preventDefault();

        const commentObj = { id, comment };

        axios
            .post("/sendComment", commentObj)
            .then((commentData) => {
                if (commentData.data == "Not registered!") {
                    setError("You need to register first to make a comment.");
                } else {
                    dispatch(addComment(commentData.data.rows));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <div>
            <form className="comment-form" onSubmit={(e) => sendComment(e)}>
                <textarea
                    required
                    type="text"
                    name="textareaComment"
                    placeholder="Make a comment"
                    onChange={(e) => handleChange(e)}
                />
                <div className="comment-button-container">
                    <input
                        type="submit"
                        value="Submit"
                        name="comment-button"
                        className="comment-button"
                    />
                </div>
                <div className="commentSection">
                    {getAllComments && error == "" ? (
                        getAllComments.map((element) => (
                            <div key={element.created_at}>
                                <div className="commentText">
                                    <span className="commentDetails">
                                        {element.comment_first}{" "}
                                        {element.comment_last}:
                                    </span>
                                    <span> {element.comment}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <span className="registerError">{error}</span>
                    )}
                </div>
            </form>
        </div>
    );
}
