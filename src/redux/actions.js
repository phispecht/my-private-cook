import axios from "../axios";

export async function getCooks() {
    const cooksData = await axios.get(`/cooks`);
    return {
        type: "GET_COOKS",
        cooksData: cooksData.data.rows,
    };
}

export async function addCook(cookData) {
    return {
        type: "ADD_COOK",
        cookData,
    };
}

export async function addImage(uploadData) {
    return {
        type: "ADD_IMAGE",
        uploadData,
    };
}

export async function addComment(commentData) {
    return {
        type: "ADD_COMMENT",
        commentData,
    };
}

export async function getComments(id) {
    const getAllComments = await axios.get(`/getComments/${id}`);

    return {
        type: "GET_COMMENTS",
        getAllComments: getAllComments.data.rows,
    };
}
