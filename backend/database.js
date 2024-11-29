import pg from 'pg';
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
        return (await response).rowsl
    } catch (e) {
        console.log(e);
    }
}
// example for future get_contrib(`'24c8c59e-a9fe-46e8-b4df-5ac8e0c46847'`);
