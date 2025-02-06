import { grid } from "../utility/grid.js";
import { errorHandle } from "../utility/errorhandle.js";
import { getRoute } from "../apiFrontSetup.js";

export async function getPublishs() {
    try {
        const data = await getRoute("publisher");
        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        for (const items in data) {
            const card = document.createElement('div');
            card.id = data[items].publisher_id;
            card.setAttribute("class", "grid-container");

            const pubName = grid(data[items].publisher_name);
            card.appendChild(pubName);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        errorHandle(error.message);
    }
}