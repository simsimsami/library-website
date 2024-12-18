import { grid } from "../utility/grid.js";
import apiRequest from "../../apiRequest.js";
import { errorHandle } from "../utility/errorhandle.js";

export async function getSubjects() {
    try {
        const request = await new apiRequest("localhost", "8080", "get/subject/", "GET");
        const data = await request.getRequest();

        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        console.log("clicked");

        for (const items in data) {
            const card = document.createElement('div');
            card.id = data[items].subject_id;

            console.log(data[items].subject_title);

            const subTitle = grid(data[items].subject_title);
            card.appendChild(subTitle);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        errorHandle(error.message);
    }
}
