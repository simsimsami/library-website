import { grid } from "../utility/grid.js";
import { errorHandle } from "../utility/errorhandle.js";
import { inputText } from "../utility/inputText.js";
import { fetchData } from "../utility/fetchData.js";
import { elementCreator } from "../utility/elementCreator.js";

export async function getContribs() {
    const url = 'http://localhost:8080/get/contrib/';
    try {
        const data = await fetchData(url);
        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        for (const items in data) {
            const card = elementCreator("div", data[items].contributor_id, " ");
            card.className = "contrib-card";

            const title = grid(data[items].contributor_title);
            const firstName = grid(data[items].contributor_first_name); //call function, make div, class-grid-item
            const lastName = grid(data[items].contributor_last_name);

            card.append(title, firstName, lastName);
            currentDiv.appendChild(card);
        }

    } catch (error) {
        console.log(error.message)
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

        const form = elementCreator("form", "form", " ");

        form.append(title, firstName, lastName, postButton);
        currentDiv.appendChild(form);

        // const postButton = document.createElement("button");
        // postButton.setAttribute("id", "post-button");
        // postButton.type = "submit";
        // postButton.innerHTML = "submit";


        // const form = document.createElement("form");
        // form.setAttribute("id", "form");

        // form.appendChild(postButton);

    } catch (error) {
        console.log(error.message);

    }
}

export async function postContrib() {
    try {
        const url = "http://localhost:8080/post/contrib/";
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json, text/plain, */*");

        const formEl = document.querySelector('#form');
        const formData = new FormData(formEl);

        // formEl.addEventListener("submit", async event => {
        //     event.preventDefault();

        // });
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
        console.log(error.message);
    }
}