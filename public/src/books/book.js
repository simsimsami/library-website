import { grid } from "../utility/grid.js";
import { errorHandle } from "../utility/errorhandle.js";

export async function getBooks() {
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