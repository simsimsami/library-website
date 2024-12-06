import { grid } from "../utility/grid.js";
import { errorHandle } from "../utility/errorhandle.js";

export async function getPublishs() {
    const url = 'http://localhost:8080/get/publisher';
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
            card.id = data[items].publisher_id;

            // const pubName = document.createElement('p');
            // pubName.setAttribute("class", "pubName");
            // pubName.innerHTML = data[items].publisher_name;


            const pubName = grid(data[items].publisher_name);
            card.appendChild(pubName);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        console.log(error.message);
    }
}