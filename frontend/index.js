import { getBooks, ListBookContrib, postBookContrib, postBookSubject, getBookContribs} from './src/books/book.js';
import { postContrib, getContribs, postContribForm } from './src/contributors/contributors.js';
import { getSubjects } from './src/subject/subject.js';
import { getPublishs } from './src/publishers/publishers.js';


function buttonTemplate(id, innerHTML) {
    const button = document.createElement("button");
    button.id = id;
    button.innerHTML = innerHTML;
    return button;
}
 
function createGetButtons() {
    const currentDiv = document.querySelector('#records');
    currentDiv.innerHTML = "";

    const buttonContainer = document.querySelector('#buttonContainer');
    buttonContainer.innerHTML = "";

    const contrib = buttonTemplate("get-contribs", "Get Contributors");
    const pub = buttonTemplate("get-publishers", "Get Publishers");
    const sub = buttonTemplate("get-subject", "Get Subjects");
    const book = buttonTemplate("get-books", "Get Books");
    buttonContainer.append(contrib, pub, sub, book);
}

function createPostButtons() {
    const currentDiv = document.querySelector('#records');
    currentDiv.innerHTML = "";
    
    const buttonContainer = document.querySelector('#buttonContainer');
    buttonContainer.innerHTML = "";

    const bookContrib = buttonTemplate("post-bookContrib", "Assign Books Contribution");
    const bookSubject = buttonTemplate("post-bookSubject", "Assign Books Subjects");
    const contrib = buttonTemplate("post-contribs","Enter Contributor Form");
    const pub = buttonTemplate("post-publishers","Post Publishers Form");
    const sub = buttonTemplate("post-subject", "Post Subjects Form");
    const book = buttonTemplate("post-books", "Post Books Form");
    buttonContainer.append(bookContrib, bookSubject, contrib, pub, sub, book);
}

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e.target);
        }
    })
}

function addGlobalEventListenerEvents(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e.target);
        }
    })
}

addGlobalEventListener("click", "#getButtons", createGetButtons)
addGlobalEventListener("click", "#postButtons", createPostButtons)


addGlobalEventListener("click", "#get-contribs", getContribs);
addGlobalEventListener("click", "#get-books", getBooks);
addGlobalEventListener("click", "#get-subject", getSubjects);
addGlobalEventListener("click", "#get-publishers", getPublishs);


addGlobalEventListenerEvents("click", ".view-button", getBookContribs)

addGlobalEventListener("click", "#post-contribs", postContribForm);
addGlobalEventListener("click", "#post-button", postContrib);
addGlobalEventListener("click", "#post-bookContrib", ListBookContrib);
addGlobalEventListener("click", "#subBookContribRole", postBookContrib);
addGlobalEventListener("click", "#post-bookSubject", postBookSubject);



// console.log("Script running");