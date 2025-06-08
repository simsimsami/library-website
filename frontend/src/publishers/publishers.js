import { grid } from "../utility/grid.js";
import { errorHandle } from "../utility/errorhandle.js";
import { deleteRoute, getRoute } from "../apiFrontSetup.js";
import { elementCreator } from "../utility/elementCreator.js";

async function publishData() {
    try {
        const data = await getRoute("publisher");
        return data;
    }
    catch (e) {
        errorHandle(e, "publishData function");
    }
}

export async function getPublishs() {
    try {
        const data = await publishData();
        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        console.log("get Publisher function");
        

        for (const items in data) {
            const card = elementCreator('div', data[items].publisher_id, " ");
            card.setAttribute("class", "grid-container");

            const pubName = grid(data[items].publisher_name);
            
            const delButton = elementCreator("button", data[items].publisher_id, "Delete");
            delButton.setAttribute("class", "publisherDeleteButton");

            card.append(pubName, delButton);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        errorHandle(error.message);
    }
}

export async function deletePublisher(event) {
    try {
        const publishId = event.id;

        console.log("publisher id: ", publishId);
        

        const request = await deleteRoute("publisher", publishId);
        if (!request.ok) {
            errorHandle(request);
        }
    }
    catch (error) {
        errorHandle(error);
    }
}