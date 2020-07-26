import axios from "./axios";

export async function getCooks() {
    const cooksData = await axios.get(`/cooks`);
    return {
        type: "GET_COOKS",
        cooksData: cooksData.data.rows,
    };
}
