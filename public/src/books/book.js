import { grid } from "../utility/grid.js";
import { errorHandle } from "../utility/errorhandle.js";

export async function getBooks() {
    const url = 'http://localhost:8080/get/book/';
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
            card.id = data[items].book_id;
            card.setAttribute('class', 'grid-container');

            const bookTitle = grid(data[items].book_title);
            const book_release = grid(data[items].book_release_date);
            const isbn = grid(data[items].isbn);
            const pub = "not yet implemented";

            card.append(bookTitle, book_release, isbn, pub);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        console.log(error.message);
    }
}

function setupSelect(id, text) {
    const option = document.createElement("option");
    option.value = `${text}`;
    option.id = id;
    option.innerHTML = text;
    return option;
}


async function getBookList() {
    try {
        const url = 'http://localhost:8080/get/book/';
        const response = await fetch(url);
        if (!response.ok) {
            errorHandle(response);
        }
        const data = await response.json();
        
        const selecBook = document.createElement("select");
        selecBook.name = "Select Book";
        
        const currentDiv = document.querySelector("#records");
        const placeholder = document.createElement("option");
        placeholder.id = "placeholder";
        placeholder.innerHTML = "placeholder";
        selecBook.appendChild(placeholder);
    
        for (const items in data) {
            const bookOption = setupSelect(data[items].book_id, data[items].book_title);
            selecBook.appendChild(bookOption);
            currentDiv.appendChild(selecBook);
        }
    } catch(error) {
        console.log(error.message);
    }
}

async function getContribList() {
    try {
        const url = "http://localhost:8080/get/contrib";
        const response = await fetch (url);
        if (!response.ok) {
            errorHandle(response);
        }

        const data = await response.json();

        const selecContrib = document.createElement("select");
        selecContrib.name = "Select Contributor";

        const currentDiv = document.querySelector("#records");
        const placeholder = document.createElement("option");
        placeholder.id = "placeholder";
        placeholder.innerHTML = "placeholder";
        selecContrib.appendChild(placeholder);

        for (const items in data) {
            const fullName = `${data[items].contributor_title} ${data[items].contributor_first_name} ${data[items].contributor_last_name}`
            const ContribOption = setupSelect(data[items].contributor_id, fullName);

            selecContrib.appendChild(ContribOption);
            currentDiv.appendChild(selecContrib);
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function getRoleList() {
    try {
        const url = "http://localhost:8080/get/role";
        const response = await fetch(url);
        if (!response.ok) {
            errorHandle(response);
        }

        const data = await response.json();

        const selecRole = document.createElement("select");
        selecRole.name = "Select Contribution Role";

        const currentDiv = document.querySelector("#records");
        const placeholder = document.createElement("option");
        placeholder.id = "placeholder";
        placeholder.innerHTML = "placeholder";
        selecRole.appendChild(placeholder);

        for (const items in data) {
            const roleOption = setupSelect(data[items].contribution_role_id, data[items].contribution_role_id);

            selecRole.appendChild(roleOption);
            currentDiv.appendChild(selecRole);
        }
    } catch (error) {
        console.log(error.message);
    }
}

export async function postBookContrib() {
    // I need three get requests. Focus on books first
    try {

        const currentDiv = document.querySelector("#records");
        currentDiv.innerHTML = "";

        getContribList();
        getRoleList();
        getBookList();

    } catch (error) {
        console.log(error.message);
    }

}