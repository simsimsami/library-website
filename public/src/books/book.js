import { grid } from "../utility/grid.js";
import { setupSelect } from "../utility/setupSelect.js";
import { elementCreator } from "../utility/elementCreator.js";
import { fetchData } from "../utility/fetchData.js";

import apiRequest from "../../apiClient2.js";
import { errorHandle } from "../utility/errorhandle.js";

// class object get request thing, too tired.

export async function getBooks() {
    try {
        const request = await new apiRequest("http://localhost:8080", "get/book/", "GET");
        const data = await request.getRequest();
        
        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";
        
        for (const items in data) {
            const card = elementCreator("div", data[items].book_id);
            card.setAttribute("class", "grid-container");
            
            const bookTitle = grid(data[items].book_title);
            const book_release = grid(data[items].book_release_date);
            const isbn = grid(data[items].isbn);
            const pub = "not yet implemented";
            
            card.append(bookTitle, book_release, isbn, pub);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        errorHandle(error);
    }
}

async function getBookList() {
    try {
        const request = await new apiRequest("http://localhost:8080", "get/book/", "GET");
        const data = await request.getRequest();
        
        const selecBook = document.createElement("select");
        selecBook.name = "Select Book";
        
        const currentDiv = document.querySelector("#records");

        const placeholder = elementCreator("option", "placeholder", "placeholder");
        selecBook.appendChild(placeholder);
        
        for (const items in data) {
            const bookOption = setupSelect(data[items].book_id, data[items].book_title);
            selecBook.appendChild(bookOption);
            currentDiv.appendChild(selecBook);
        }
    } catch(error) {
        errorHandle(error);
    }
}

async function getContribList() {
    try {
        const response = await new apiRequest("http://localhost:8080", "get/contrib/", "GET");
        const data = await response.getRequest();

        const selecContrib = document.createElement("select");
        selecContrib.name = "Select Contributor";

        const currentDiv = document.querySelector("#records");

        const placeholder = elementCreator("option", "placeholder", "placeholder");

        selecContrib.appendChild(placeholder);

        for (const items in data) {
            const fullName = `${data[items].contributor_title} ${data[items].contributor_first_name} ${data[items].contributor_last_name}`
            const ContribOption = setupSelect(data[items].contributor_id, fullName);
            selecContrib.appendChild(ContribOption);
            currentDiv.appendChild(selecContrib);
        }
    } catch (error) {
        errorHandle(error);
    }
}

async function getRoleList() {
    try {
        const response = await new apiRequest("http:localhost:8080", "get/role/", "GET");
        const data = await response.getRequest();

        const selecRole = document.createElement("select");
        selecRole.name = "Select Contribution Role";

        const currentDiv = document.querySelector("#records");

        const placeholder = elementCreator("option", "placeholder", "placeholder");

        selecRole.appendChild(placeholder);

        for (const items in data) {
            const roleOption = setupSelect(data[items].contribution_role_id, data[items].contribution_role_id);

            selecRole.appendChild(roleOption);
            currentDiv.appendChild(selecRole);
        }
    } catch (error) {
        errorHandle(error);
    }
}

export async function postBookContrib() {
    try {
        const currentDiv = document.querySelector("#records");
        currentDiv.innerHTML = "";

        getContribList();
        getRoleList();
        getBookList();
    } catch (error) {
        errorHandle(error);
    }
}