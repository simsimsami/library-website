import { grid } from "../utility/grid.js";
import { errorHandle } from "../utility/errorhandle.js";

export async function getSubjects() {
    const url = 'http://localhost:8080/get/subject';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            errorHandle(response);
        }
        const data = await response.json();
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
        console.log(error.message);
    }
}
