import { grid } from "../utility/grid.js";
import { contribData } from "../contributors/contributors.js";
import { roleData } from "../roles/role.js";
import { setupSelect } from "../utility/setupSelect.js";
import { elementCreator } from "../utility/elementCreator.js";
import { getSubjectList } from "../subject/subject.js";
import { errorHandle } from "../utility/errorhandle.js";
import { getRoute, postRoute } from "../apiFrontSetup.js"

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

async function bookData(id = "") {
    try {
        if (isNumber(id) === true || !id) {
            const data = await getRoute("book",id);
            return data;
        }
        else {
            errorHandle("bookData. ID input is not valid, is not a number or other");
            console.log("here is the value: ",id);
            console.log(isNumber(id));
        }
    }
    catch (e) {
        errorHandle(e, "bookData function");
    }
}

export async function listBooksData() {
    try {
        const data = await bookData();
        
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
            const subjectList = "Stuff";
            viewButton.setAttribute("class", "view-button");

            card.append(bookTitle, book_release, isbn, pub, subjectList, viewButton);
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

        const data = await bookData(bookId);

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
        const data = await bookData();
        
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
        const data = await contribData();

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
        const data = await roleData();

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
        const b = document.querySelector("#bookOptions");
        const c = document.querySelector("#contribOptions");
        const r = document.querySelector("#roleOptions");

        const book = b.options[b.selectedIndex].id;
        const contrib = c.options[c.selectedIndex].id;
        const role = r.options[r.selectedIndex].id;

        const postData = {
            "book_id": `${book}`,
            "contributor_id": `${contrib}`,
            "contribution_role_id": `${role}`
        };

        const request = await postRoute("bookContrib", postData);
        if (!request.ok) {
            errorHandle(request);
        }

    } catch (error) {
        errorHandle(error.message);
    }
}

export async function listBookSubject() {
    try {
        console.log("List book subject function ran");

        const currentDiv = document.querySelector("#records");
        currentDiv.innerHTML = "";

        const form = elementCreator("form", "formBookSubForm", "");

        const subButton = elementCreator("button", "post-bookSubject", "Submit");
        subButton.setAttribute("type", "button");

        const bookList = await getBookList();
        const subjectList = await getSubjectList();

        form.append(bookList, subjectList, subButton);
        currentDiv.appendChild(form);
    }
    catch (error) {
        errorHandle(error.message);
    }
}

export async function postBookSubject() {
    const formEl = document.querySelector("#formBookSubForm");
    const b = document.querySelector("#bookOptions");
    const s = document.querySelector("#subjectOptions");

    const bookId = b.options[b.selectedIndex].id;
    const subjectId = s.options[s.selectedIndex].id;

    const postData = {
        book_id: bookId,
        subject_id: subjectId
    };

    const response = await postRoute("bookSubject", postData).catch(e => console.log(e));
}

export async function listBookContrib() {
    try {
        const currentDiv = document.querySelector("#records");
        currentDiv.innerHTML = "";

        const form = elementCreator("form", "formBookContribForm", " ");

        const subButton = elementCreator("button", "subBookContribRole", "Submit");
        subButton.type = "button";


        const contribList = await getContribList();
        const roleList = await getRoleList();
        const bookList = await getBookList();

        form.append(contribList, roleList, bookList, subButton);

        currentDiv.appendChild(form);
        
    } catch (error) {
        errorHandle(error.message);
    }
}
