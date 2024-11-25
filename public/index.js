
async function getContribs() {
    const url = 'http://localhost:8080/get/contrib/';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const data = await response.json();
        const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

        for (const items in data) {
            // I need id, first name, surname and title.
            const card = document.createElement('div');
            card.id = data[items].contributor_id;
            card.setAttribute('class', 'grid-container')

            const title = document.createElement('div');
            title.setAttribute("class", "grid-item");

            const firstName = document.createElement('div');
            firstName.setAttribute('class', 'grid-item');

            const lastName = document.createElement('div');
            lastName.setAttribute('class', 'grid-item');

            // grid system


            title.innerHTML = data[items].contributor_title;
            firstName.innerHTML = data[items].contributor_first_name;
            lastName.innerHTML = data[items].contributor_last_name;

            card.append(title, firstName, lastName);
            currentDiv.appendChild(card);
        }

    } catch (error) {
        console.log(error.message)
    }
}

async function errorHandle(response) {
    throw new Error(`Response Status`);
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

            const subTitle = document.createElement('p');
            subTitle.setAttribute('class', 'subTitle');

            subTitle.innerHTML = data[items].subject_title;
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
            card.setAttribute('class', 'grid-container')


            const bookTitle = document.createElement('div');
            bookTitle.setAttribute('class', 'grid-item');

            const book_release = document.createElement('div');
            book_release.setAttribute('class', 'grid-item');

            const isbn = document.createElement('div');
            isbn.setAttribute('class', 'grid-item');

            // dont have publisher names yet





            bookTitle.innerHTML = data[items].book_title;
            book_release.innerHTML = data[items].book_release_date;
            isbn.innerHTML = data[items].isbn;

            card.append(bookTitle, book_release, isbn);
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

            const pubName = document.createElement('p');
            pubName.setAttribute("class", "pubName");

            pubName.innerHTML = data[items].publisher_name;
            card.appendChild(pubName);
            currentDiv.appendChild(card);
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Want a list of books

async function grid(data) {
    const currentDiv = document.querySelector('#records');
    const gridContainer = document.createElement('div');
    for (const items in data) {
        const gridItem = documen.createElement('div');
    }
}

const contribButton = document.querySelector("#contribs");
contribButton.addEventListener("click", getContribs)

const publishButton = document.querySelector('#publishers');
publishButton.addEventListener("click", getPublishs)

const subjectButton = document.querySelector('#subject');
subjectButton.addEventListener('click', getSubjects);

const bookButton = document.querySelector('#books');
bookButton.addEventListener('click', getBooks);

// console.log("Script running");