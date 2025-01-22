import { grid } from "../utility/grid.js";
import { setupSelect } from "../utility/setupSelect.js";
import { elementCreator } from "../utility/elementCreator.js";
import { getSubjectList } from "../subject/subject.js";
import { errorHandle } from "../utility/errorhandle.js";
import { getRoute } from "../apiSetup.js"


export async function getBooks() {
    try {
        const data = await getRoute("book");
        
        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        for (const items in data) {
            const card = elementCreator("div", data[items].book_id, "");
            card.setAttribute("class", "grid-container");

            const bookTitle = grid(data[items].book_title);
            const book_release = grid(data[items].book_release_date);
            const isbn = grid(data[items].isbn);
            const pub = grid(data[items].publisher_name);
            const viewButton = elementCreator("button", data[items].book_id, "View Contributors");
            viewButton.setAttribute("class", "view-button");

            card.append(bookTitle, book_release, isbn, pub, viewButton);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        errorHandle(error.message);
    }
}

export async function getBookContribs(event) {
    try {
        const currentDiv = document.querySelector("#records");
        currentDiv.innerHTML = "";

        const bookId = event.id;

        const data = await getRoute("book", bookId);

        for (const items in data) {
            const card = elementCreator("div", bookId, "");
            card.setAttribute("class", "grid-container");

            const contriTitle = grid(data[items].contributor_title);
            const contriFirstName = grid(data[items].contributor_first_name);
            const contriLastName = grid(data[items].contributor_last_name);
            const roleTitle = grid(data[items].contribution_role_title);

            card.append(contriTitle, contriFirstName, contriLastName, roleTitle);

            currentDiv.appendChild(card);
        }
    } catch (error) {
        errorHandle(error.message);
    }
}

async function getBookList() {
    try {
        const data = await getRoute("book");
        
        const select = document.createElement("select");
        select.name = "Select Book";
        select.id = "bookOptions";

        
        const placeholder = elementCreator("option", "placeholder", "Books List");
        select.appendChild(placeholder);
        
        for (const items in data) {
            const bookOption = setupSelect(data[items].book_id, data[items].book_title);
            select.appendChild(bookOption);
        }
        return select;
    } catch(error) {
        errorHandle(error.message);
    }
}

async function getContribList() {
    try {
        const data = await getRoute("contrib");

        const select = document.createElement("select");
        select.name = "Select Contributor";
        select.id = "contribOptions";

        const placeholder = elementCreator("option", "placeholder", "Contributor List");

        select.appendChild(placeholder);

        for (const items in data) {
            const fullName = `${data[items].contributor_title} ${data[items].contributor_first_name} ${data[items].contributor_last_name}`
            const ContribOption = setupSelect(data[items].contributor_id, fullName);
            select.appendChild(ContribOption);
        }
        return select;
    } catch (error) {
        errorHandle(error.message);
    }
}

export async function getRoleList() {
    try {
        const data = await getRoute("role");

        const select = document.createElement("select");
        select.name = "Select Contribution Role";
        select.id = "roleOptions";

        const placeholder = elementCreator("option", "placeholder", "Contribution Role List");

        select.appendChild(placeholder);

        for (const items in data) {
            const roleOption = setupSelect(data[items].contribution_role_id, data[items].contribution_role_title);
            select.appendChild(roleOption);
        }
        return select;
    } catch (error) {
        errorHandle(error.message);
    }
}

export async function postBookContrib() {
    try {
        const url = "http://localhost:8080/post/bookContrib";
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json, text/plain, */*");

        const b = document.querySelector("#bookOptions");
        const c = document.querySelector("#contribOptions");
        const r = document.querySelector("#roleOptions");

        const book = b.options[b.selectedIndex].id;
        const contrib = c.options[c.selectedIndex].id;
        const role = r.options[r.selectedIndex].id;

        const response = await fetch(url, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                book_id: book,
                contributor_id: contrib,
                contribution_role_id: role
            })
        }).catch(error => errorHandle(error));
       console.log(contrib,role,book);
    } catch (error) {
        errorHandle(error.message);
    }
}

export async function postBookSubject() {
    try {
        const currentDiv = document.querySelector("#records");
        currentDiv.innerHTML = "";

        const form = elementCreator("form", "formBookSubForm", "");
        
        const subButton = elementCreator("button", "subBookSub", "submit");
        subButton.type = "submit";

        const bookList = await getBookList();
        const subjectList = await getSubjectList();

        form.append(bookList, subjectList, subButton);
        currentDiv.appendChild(form);
    }
    catch (error) {
        errorHandle(error.message);
    }
}

export async function ListBookContrib() {
    try {
        const currentDiv = document.querySelector("#records");
        currentDiv.innerHTML = "";

        const form = elementCreator("form", "formBookContribForm", " ");

        const subButton = elementCreator("button", "subBookContribRole", "Submit");
        subButton.type = "submit";


        const contribList = await getContribList();
        const roleList = await getRoleList();
        const bookList = await getBookList();

        form.append(contribList, roleList, bookList, subButton);

        currentDiv.appendChild(form);
        
    } catch (error) {
        errorHandle(error.message);
    }
}
