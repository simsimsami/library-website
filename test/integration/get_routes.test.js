import { expect, describe, test } from 'vitest';
import request from "supertest";
import Server from '../../backend/setupServer.js';


// I need to import all routes
// I need to conduct unit tests. Need to look into it

describe("GET for /book", () => {
    test("Return 200 response when getting books", async () => {
        const app = new Server().getApp();
        const response = await request(app).get('/get/book/');
        expect(response.statusCode).toBe(200);
    });
    test("Return data in a json format", async () => {
        const app = new Server().getApp();
        const response = await request(app).get('/get/book/');
        expect(response.headers["content-type"]).toContain("json");
    });
    test("Returning 200 when getting a specific book", async () => {
        const app = new Server().getApp();
        const response = await request(app).get('/get/book/1');
        expect(response.statusCode).toBe(200);
    });
    test("Returning json body when getting a specific book", async () => {
        const app = new Server().getApp();
        const response = await request(app).get('/get/book/1');
        expect(response.headers["content-type"]).toContain("json");
    });
    test("Pass if Json body is non empty", async () => {
        const app = new Server().getApp();
        const response = await request(app).get('/get/book/1');
        const objToString = JSON.stringify(response);

        expect(objToString.length).toBeGreaterThan(0);
    });
    // test("Return nothing if invalid id", async () => {
    //     const app = new Server().getApp();
    //     const response = await request(app).get('/get/book/1000000000');
    //     expect(response.status).toBe(400);
    // });
    // Test: send a invalid id (big number).

    // Test: send a invalid id (string or other)
});

describe("GET for /contributors", () => {
    test("Return 200 response when getting contributors", async () => {
        const app = new Server().getApp();
        const response = await request(app).get('/get/contrib');
        expect(response.statusCode).toBe(200);
    });
    test("Return data in a json format", async () => {
        const app = new Server().getApp();
        const response = await request(app).get('/get/contrib');
        expect(response.header["content-type"]).toContain("json");
    })
});

// describe("GET for /subject", () => {

// });

// describe("GET for /contributor_role", () => {

// });

// describe("GET for /book_contributor", () => {

// });