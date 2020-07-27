import axios from "./axios";

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
