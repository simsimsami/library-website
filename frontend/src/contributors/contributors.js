import { grid } from "../utility/grid.js";
import { errorHandle } from "../utility/errorhandle.js";
import { inputText } from "../utility/inputText.js";
import { elementCreator } from "../utility/elementCreator.js";
import apiRequest from "../../apiRequest.js"

export async function getContribs() {
    try {
        const request = await new apiRequest("localhost", "8080", "get/contrib/", "GET");
        const data = await request.getRequest();

        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        for (const items in data) {
            const card = elementCreator("div", data[items].contributor_id, " ");
            card.setAttribute("class", "grid-container");

            const contriTitle = grid(data[items].contributor_title);
            const contriFirstName = grid(data[items].contributor_first_name); //call function, make div, class-grid-item
            const contriLastName = grid(data[items].contributor_last_name);

            card.append(contriTitle, contriFirstName, contriLastName);
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

        const postButton = elementCreator("button", "post-button", "submit");
        postButton.type = "submit";

        const form = elementCreator("form", "formContribForm", " ");

        form.append(title, firstName, lastName, postButton);
        currentDiv.appendChild(form);
    } catch (error) {
        errorHandle(error.message);
    }
}

export async function postContrib() {
    try {
        const url = "http://localhost:8080/post/contrib/";
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json, text/plain, */*");

        const formEl = document.querySelector('#formContribForm');
        const formData = new FormData(formEl);

        const title = formData.get("title");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");

        const response = await fetch(url, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                contributor_first_name: firstName,
                contributor_last_name: lastName,
                contributor_title: title
            }),
        }).catch(error => errorHandle(error));
    } catch (error) {
        errorHandle(error.message);
    }
}
