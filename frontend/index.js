import { 
    listBooksData, 
    listBookContrib, 
    getBookContribs,
    postBookContrib, 
    listBookSubject, 
    postBookSubject, 
} from './src/books/book.js';
import { postContrib, listContribData, postContribForm, deleteContrib } from './src/contributors/contributors.js';
import { getSubjects, postSubjectForm, postSubject} from './src/subject/subject.js';
import { getPublishs, deletePublisher } from './src/publishers/publishers.js';
import { listRoleData, deleteContribRole } from './src/roles/role.js';


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
    const role = buttonTemplate("get-roles", "Get Roles");
    buttonContainer.append(contrib, role, pub, sub, book);
}

function createPostButtons() {
    const currentDiv = document.querySelector('#records');
    currentDiv.innerHTML = "";
    
    const buttonContainer = document.querySelector('#buttonContainer');
    buttonContainer.innerHTML = "";

    const bookContrib = buttonTemplate("post-bookContrib", "Assign Books Contribution");
    const bookSubject = buttonTemplate("list-bookSubject", "Assign Books Subjects");
    const contrib = buttonTemplate("post-contribs","Enter Contributor Form");
    const pub = buttonTemplate("post-publishers","Post Publishers Form");
    const sub = buttonTemplate("post-subject-form", "Post Subjects Form");
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


addGlobalEventListener("click", "#get-contribs", listContribData);
addGlobalEventListener("click", "#get-roles", listRoleData)
addGlobalEventListener("click", "#get-books", listBooksData);
addGlobalEventListener("click", "#get-subject", getSubjects);
addGlobalEventListener("click", "#get-publishers", getPublishs);


addGlobalEventListenerEvents("click", ".view-button", getBookContribs)

addGlobalEventListener("click", "#post-contribs", postContribForm);
addGlobalEventListener("click", "#post-contrib-button", postContrib);

addGlobalEventListener("click", "#post-subject-form", postSubjectForm);
addGlobalEventListener("click", "#post-subject", postSubject);


addGlobalEventListener("click", "#post-bookContrib", listBookContrib);
addGlobalEventListener("click", "#subBookContribRole", postBookContrib);

addGlobalEventListener("click", "#list-bookSubject", listBookSubject);
addGlobalEventListener("click", "#post-bookSubject", postBookSubject);

addGlobalEventListener("click", ".contribDeleteButton", deleteContrib)
addGlobalEventListener("click", ".contribRoleDeleteButton", deleteContribRole)
addGlobalEventListener("click", ".publisherDeleteButton", deletePublisher)




// console.log("Script running");