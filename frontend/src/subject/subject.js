import { grid } from "../utility/grid.js";
import apiRequest from "../../apiRequest.js";
import { errorHandle } from "../utility/errorhandle.js";
import { elementCreator } from "../utility/elementCreator.js";
import { setupSelect } from "../utility/setupSelect.js";

export async function getSubjects() {
    try {
        const request = await new apiRequest("localhost", "8080", "get/subject/", "GET");
        const data = await request.getRequest();

        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        for (const items in data) {
            const card = document.createElement('div');
            card.id = data[items].subject_id;
            card.setAttribute("class", "grid-container");

            const subTitle = grid(data[items].subject_title);
            card.appendChild(subTitle);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        errorHandle(error.message);
    }
}

export async function getSubjectList() {
    try {
        const response = await new apiRequest("localhost", "8080", "get/subject/", "GET");
        const data = await response.getRequest();

        const select = document.createElement("select");
        select.name = "Select Subject";
        select.id = "subjectOptions";

        const placeholder = elementCreator("option", "placeholder", "Subject List");

        select.appendChild(placeholder);

        for (const items in data) {
            const subjectOption = setupSelect(data[items].subject_id, data[items].subject_title);
            select.appendChild(subjectOption);
        }
        return select;
    } catch (error) {
        errorHandle(error.message);
    }
}