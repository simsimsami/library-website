import pg from 'pg';
import { errorHandle } from '../frontend/src/utility/errorhandle.js';

const { Client, Pool } = pg;
const client = new Client({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5435,
    database: 'library_project',
});
async function getConnection() {
    const client = new Client({
        user: 'postgres',
        password: '1234',
        host: 'localhost',
        port: 5435,
        database: 'library_project',
    });

    await client.connect();
    return client;
}

// get routes

// contrib functions. I want to show contributors
export async function get_contribs() {
    try {
        const text = 'SELECT * FROM contributor';
        const response = (await getConnection()).query(text)
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}
// specific contrib will show what contributions they have done
export async function get_contrib(contrib_id) {
    try {
        // not properly finished
        const text = 'SELECT * from contributor where contributor_id = $1';
        const value = [contrib_id];
        const response = (await getConnection()).query(text, value);
        return (await response).rows
    } catch (e) {
        console.log(e);
    }
}
// publisher function. I want to show publishers
export async function get_publishers() {
    try {
        const text = 'SELECT * FROM publisher';
        const response = (await getConnection()).query(text);
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}
// Specific publisher will show what books they have published
export async function get_publisher(publisher_id) {
    try {
        const text = 'SELECT * FROM publisher WHERE publisher_id = $1';
        const value = [publisher_id];
        const response = (await getConnection()).query(text, value);
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}
// show all subjects
export async function get_subjects() {
    try {
        const text = 'SELECT * from subject';
        const response = (await getConnection()).query(text);
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}
// I want to show specific books that are with this subject (genre)
// no book, just gonna show the single subject for now
export async function get_subject(sub_id) {
    try {
        const text = 'SELECT * from subject where subject_id = $1';
        const value = [sub_id];
        const response = (await getConnection()).query(text, value)
        return (await response).rows;
    } catch (e) {
        console.log(e)
    }
}
// contribution roles
export async function get_contrib_roles() {
    try {
        const text = 'SELECT * from contribution_role';
        const response = (await getConnection()).query(text);
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}

export async function get_contrib_role(role_id) {
    try {
        const text = 'SELECT * from contribution_role where contribution_role_id = $1';
        const value = [role_id];
        const response = (await getConnection()).query(text, value);
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}
// I want to show all relevant information on these books. title, release date, isbn and publisher
export async function get_books() {
    try {
        const text = 'SELECT b.book_id, b.book_title, p.publisher_name, b.book_release_date, b.isbn from book b INNER JOIN publisher p ON b.publisher_id = p.publisher_id ORDER BY b.book_id';
        const response = (await getConnection()).query(text);
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}

// I want to show relevant details when showing a specific book. Its genre, contributors, publishers.
export async function get_book(book_id) {
    try {
        const text = 'SELECT b.book_title, con.contributor_title, con.contributor_first_name, con.contributor_last_name, con_role.contribution_role_title, p.publisher_name FROM books_contributor book_con INNER JOIN book b ON b.book_id = book_con.book_id INNER JOIN contributor con ON con.contributor_id = book_con.contributor_id INNER JOIN contribution_role con_role ON con_role.contribution_role_id = book_con.contribution_role_id INNER JOIN publisher p ON b.publisher_id = p.publisher_id WHERE b.book_id = $1';
        const value = [book_id];
        const response = (await getConnection()).query(text, value);
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}


// post routes

export async function post_contrib(contributor_first_name, contributor_last_name, contributor_title) {
    try {
        const text = "INSERT INTO contributor (contributor_first_name, contributor_last_name, contributor_title) VALUES ($1, $2, $3) RETURNING * ";
        const values = [contributor_first_name, contributor_last_name, contributor_title]
        const response = (await getConnection()).query(text, values).catch(error => errorHandle(error));
        console.log("Data Inserted");
    } catch (e) {
        console.log(e);
    }
}

export async function post_bookContrib(book_id, contrib_id , contriRole_id) {
    try {
        const text = "INSERT INTO books_contributor (book_id, contributor_id, contribution_role_id) VALUES ($1, $2, $3) RETURNING * ";
        const values = [book_id, contrib_id, contriRole_id];
        const response = (await getConnection()).query(text, values).catch(error => errorHandle(error));
        console.log("Data Inserted");
    } catch (e) {
        console.log(e);
    }
}