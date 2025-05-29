import { grid } from "../utility/grid.js";
import { errorHandle } from "../utility/errorhandle.js";
import { inputText } from "../utility/inputText.js";
import { elementCreator } from "../utility/elementCreator.js";
import { deleteRoute, getRoute, postRoute } from "../apiFrontSetup.js";


export async function contribData() {
    try {
         const data = await getRoute("contrib");
         return data;
    }
    catch (e) {
        errorHandle(e, "contribData function");
    }
}

export async function listContribData() {
    try {
        const data = await contribData();

        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";
        
        
        for (const items in data) {
            const card = elementCreator("div", data[items].contributor_id, " ");
            card.setAttribute("class", "grid-container");
            
            const contriTitle = grid(data[items].contributor_title);
            const contriFirstName = grid(data[items].contributor_first_name); //call function, make div, class-grid-item
            const contriLastName = grid(data[items].contributor_last_name);
            
            const delButton = elementCreator("button", data[items].contributor_id, "Delete");
            delButton.setAttribute("class", "contribDeleteButton");

            card.append(contriTitle, contriFirstName, contriLastName, delButton);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        errorHandle(error.message);
    }
}

export function postContribForm() {
    try {
        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        const title = inputText("title", "Title");
        const firstName = inputText("firstName", "First Name");
        const lastName = inputText("lastName", "Last Name");

        const postButton = elementCreator("button", "post-contrib-button", "submit");
        postButton.type = "submit";

        const form = elementCreator("form", "formContribForm", "");

        form.append(title, firstName, lastName, postButton);
        currentDiv.appendChild(form);
    } catch (error) {
        errorHandle(error.message);
    }
}

export async function postContrib() {
    try {

        const formEl = document.querySelector('#formContribForm');
        const formData = new FormData(formEl);

        const title = formData.get("title");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");

        const postData = {
            "contributor_first_name": `${firstName}`,
            "contributor_last_name": `${lastName}`,
            "contributor_title": `${title}`
        };

        const request = await postRoute("contrib", postData);
        if (!request.ok) {
            errorHandle(request)
        }
    } catch (error) {
        errorHandle(error.message);
    }
}

export async function deleteContrib(event) {
    try {
        const contribId = event.id;

        const request = await deleteRoute("contrib", contribId);
        if (!request.ok) {
            errorHandle(request);
        }
                
    } catch (error) {
        errorHandle(error);
    }
}