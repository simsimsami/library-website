import { getBooks } from './src/books/book.js';
import { postContrib, getContribs, postContribForm } from './src/contributors/contributors.js';
import { getSubjects } from './src/subject/subject.js';
import { getPublishs } from './src/publishers/publishers.js';
 
function createGetButtons() {
    const currentDiv = document.querySelector('#records');
        currentDiv.innerHTML = "";

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
    const currentDiv = document.querySelector('#records');
    currentDiv.innerHTML = "";


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