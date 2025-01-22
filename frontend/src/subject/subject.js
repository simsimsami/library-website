import { grid } from "../utility/grid.js";
import apiRequest from "../../apiRequest.js";
import { errorHandle } from "../utility/errorhandle.js";
import { elementCreator } from "../utility/elementCreator.js";
import { setupSelect } from "../utility/setupSelect.js";
import { inputText } from "../utility/inputText.js";


export async function getSubjects() {
    try {
        const request = await new apiRequest("localhost", "8080", "/get/subject/");
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
        const response = await new apiRequest("localhost", "8080", "/get/subject/");
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

// post subject form

export async function postSubjectForm() {
    try {
        const currentDiv = document.querySelector("#records");
        currentDiv.innerHTML = "";
        
        const form = elementCreator("form", "formSubjectForm", "");
        
        const title = inputText("title", "Subject Title");
        const postButton = elementCreator("button", "post-subject", "submit");
        postButton.type = "submit";
        

        form.append(title, postButton);
        currentDiv.appendChild(form);
    } catch (error) {
        errorHandle(error);
    }
}

export async function postSubject() {
    try {

        const formEl = document.querySelector("#formSubjectForm");
        formEl.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(formEl);
            
            const title = formData.get("title");
            
            const postData = {
                "subject_title": `${title}`
            };

            console.log(postData);
            
            const request = await new apiRequest("localhost", "8080", "/post/subject");
            const response = await request.postRequest(postData);
        });

    } catch (error) {
        errorHandle(error);
        if (error instanceof SyntaxError) {
            const textResponse = await response.text();
            console.error("Error: ", textResponse);
        } else {
            console.error("Unexpected error: ", error.message);
            
        }
    }
}