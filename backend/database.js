import pg from 'pg';
import { errorHandle } from '../public/src/utility/errorhandle.js';
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

        const response = (await getConnection()).query(`SELECT * FROM contributor`)
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}
// specific contrib will show what contributions they have done
export async function get_contrib(contrib_id) {
    try {
        // not properly finished
        const response = (await getConnection()).query(`SELECT * from contributor where contributor_id = $1`, [contrib_id]);
        return (await response).rows
    } catch (e) {
        console.log(e);
    }
}
// publisher function. I want to show publishers
export async function get_publishers() {
    try {
        const response = (await getConnection()).query('SELECT * FROM publisher');
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}
// Specific publisher will show what books they have published
export async function get_publisher(publisher_id) {
    try {
        const response = (await getConnection()).query(`SELECT * FROM publisher WHERE publisher_id = $1`, [publisher_id]);
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}
// show all subjects
export async function get_subjects() {
    try {
        const response = (await getConnection()).query(`SELECT * from subject`);
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}
// I want to show specific books that are with this subject (genre)
// no book, just gonna show the single subject for now
export async function get_subject(id) {
    try {
        const response = (await getConnection()).query(`SELECT * from subject where subject_id = $1`, [id])
        return (await response).rows;
    } catch (e) {
        console.log(e)
    }
}
// contribution roles
export async function get_contrib_roles() {
    try {
        const response = (await getConnection()).query(`SELECT * from contribution_role`);
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}

export async function get_contrib_role(role_id) {
    try {
        const response = (await getConnection()).query(`SELECT * from contribution_role where contribution_role_id = $1`, [role_id]);
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}
// books
export async function get_books() {
    try {
        const response = (await getConnection()).query('SELECT * from book');
        return (await response).rows;
    } catch (e) {
        console.log(e);
    }
}
export async function get_book(book_id) {
    try {
        const response = (await getConnection()).query('SELECT * from book where book_id = $1', [book_id]);
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
        const text = "INSERT INTO books_contributor (book_id, contributor_id, contribution_role_id VALUES ($1, $2, $3) RETURNING * ";
        const values = [book_id, contrib_id, contriRole_id];
        const response = (await getConnection()).query(text, values).catch(error => errorHandle(error));
        console.log("Data Inserted");
    } catch (e) {
        console.log(e);
    }
}