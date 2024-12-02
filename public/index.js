
function grid(data) {
    const gridItem = document.createElement('div');
    gridItem.setAttribute("class", "grid-item");
    gridItem.innerHTML = data;
    return gridItem;
}

async function errorHandle(response) {
    throw new Error(`Response Status: ${response.status}`);
}


async function getContribs() {
    const url = 'http://localhost:8080/get/contrib/';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            errorHandle(response);
        }
        const data = await response.json();
        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        for (const items in data) {
            // I need id, first name, surname and title.

            const card = document.createElement('div'); // call function, make div, class
            card.id = data[items].contributor_id;
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

function inputText(id, placeholder) {
    const input = document.createElement('input');
    input.setAttribute("type", "text")
    input.setAttribute("placeholder", placeholder)
    input.setAttribute("id", id);
    input.setAttribute("className", "input-class");
    input.setAttribute("name", id);
    return input;
}

function postContribForm() {
    try {
        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        const title = inputText("title", "Title");
        const firstName = inputText("firstName", "First Name");
        const lastName = inputText("lastName", "Last Name");
        const postButton = document.createElement("button");


        postButton.setAttribute("id", "post-button");
        postButton.type = "submit"; //setAttribute("type", "button");
        postButton.innerHTML = "submit";


        const form = document.createElement("form");
        form.setAttribute("id", "form");

        form.append(title, firstName, lastName, postButton);
        // form.appendChild(postButton);

        currentDiv.appendChild(form);
    } catch (error) {
        console.log(error.message);

    }
}

async function postContrib() {
    try {
        const url = "http://localhost:8080/post/contrib/";
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const formEl = document.querySelector('#form');

        formEl.addEventListener("submit", async event => {
            event.preventDefault();

            const formData = new FormData(formEl);
            console.log(formData.get("title"));
            console.log(formData.get("firstName"));
            console.log(formData.get("lastName"));

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ title, firstName, lastName }),
                headers: myHeaders,
            });

        });

    } catch (error) {
        console.log(error.message);
    }
}


async function getSubjects() {
    const url = 'http://localhost:8080/get/subject';
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
            card.id = data[items].subject_id;

            const subTitle = grid(data[items].subject_title);
            card.appendChild(subTitle);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function getBooks() {
    const url = 'http://localhost:8080/get/book';
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

async function getPublishs() {
    const url = 'http://localhost:8080/get/publisher';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        for (const items in data) {
            const card = document.createElement('div');
            card.id = data[items].publisher_id;

            // const pubName = document.createElement('p');
            // pubName.setAttribute("class", "pubName");
            // pubName.innerHTML = data[items].publisher_name;


            const pubName = grid(data[items].publisher_name);
            card.appendChild(pubName);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        console.log(error.message);
    }
}

function clear() {
    const records = document.querySelector('#records');
    records.innerHTML = "";
}

// Want a list of books

function createGetButtons() {
    clear();

    const buttonContainer = document.querySelector('#buttonContainer');
    buttonContainer.innerHTML = "";
    const contrib = document.createElement('button');
    const pub = document.createElement('button');
    const sub = document.createElement('button');
    const book = document.createElement('button');
    contrib.id = "get-contribs";
    contrib.innerHTML = "Get Contributors";
    pub.id = "get-publishers";
    pub.innerHTML = "Get Publishers";
    sub.id = "get-subject";
    sub.innerHTML = "Get Subjects";
    book.id = "get-books";
    book.innerHTML = "Get Books";
    buttonContainer.append(contrib, pub, sub, book);
}

function createPostButtons() {
    clear();


    const buttonContainer = document.querySelector('#buttonContainer');
    buttonContainer.innerHTML = "";
    const contrib = document.createElement('button');
    const pub = document.createElement('button');
    const sub = document.createElement('button');
    const book = document.createElement('button');
    contrib.id = "post-contribs";
    pub.id = "post-publishers";
    sub.id = "post-subject";
    book.id = "post-books";
    contrib.innerHTML = "Post Contributors Form";
    pub.innerHTML = "Post Publishers Form";
    sub.innerHTML = "Post Subjects Form";
    book.innerHTML = "Post Books Form";
    buttonContainer.append(contrib, pub, sub, book);
}

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback();
        }
    })
}

addGlobalEventListener("click", "#getButtons", createGetButtons)
addGlobalEventListener("click", "#postButtons", createPostButtons)


addGlobalEventListener("click", "#get-contribs", getContribs);
addGlobalEventListener("click", "#get-books", getBooks);
addGlobalEventListener("click", "#get-subject", getSubjects);
addGlobalEventListener("click", "#get-publishers", getPublishs);

addGlobalEventListener("click", "#post-contribs", postContribForm);
addGlobalEventListener("click", "#post-button", postContrib);


// console.log("Script running");