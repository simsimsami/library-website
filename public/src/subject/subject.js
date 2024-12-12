import { grid } from "../utility/grid.js";
import apiRequest from "../../apiClient2.js";
import { errorHandle } from "../utility/errorhandle.js";

export async function getSubjects() {
    try {
        const request = await new apiRequest("http://localhost:8080", "get/subject", "GET");
        const data = request.getRequest();
        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        for (const items in data) {
            const card = document.createElement('div');
            card.id = data[items].subject_id;

            const subTitle = grid(data[items].subject_title);
            card.appendChild(subTitle);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        errorHandle(error);
    }
}
