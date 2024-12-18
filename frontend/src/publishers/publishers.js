import { grid } from "../utility/grid.js";
import { errorHandle } from "../utility/errorhandle.js";
import apiRequest from "../../apiRequest.js";

export async function getPublishs() {
    try {
        const request = await new apiRequest("localhost", "8080", "get/publisher/", "GET");
        const data = await request.getRequest();
        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        for (const items in data) {
            const card = document.createElement('div');
            card.id = data[items].publisher_id;

            const pubName = grid(data[items].publisher_name);
            card.appendChild(pubName);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        errorHandle(error.message);
    }
}