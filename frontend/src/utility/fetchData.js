import { errorHandle } from "./errorhandle.js";

export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            errorHandle(response);
        }
        return await response.json();
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}