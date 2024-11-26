
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

function grid(data) {
    const gridItem = document.createElement('div');
    gridItem.setAttribute("class", "grid-item");
    gridItem.innerHTML = data;
    return gridItem;
}

async function errorHandle(response) {
    throw new Error(`Response Status: ${response.status}`);
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

// Want a list of books


const contribButton = document.querySelector("#contribs");
contribButton.addEventListener("click", getContribs)

const publishButton = document.querySelector('#publishers');
publishButton.addEventListener("click", getPublishs)

const subjectButton = document.querySelector('#subject');
subjectButton.addEventListener('click', getSubjects);

const bookButton = document.querySelector('#books');
bookButton.addEventListener('click', getBooks);

// console.log("Script running");