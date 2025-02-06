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
    // test("Return nothing if invalid id", async () => {
    //     const app = new Server().getApp();
    //     const response = await request(app).get('/get/book/1000000000');
    //     expect(response.status).toBe(400);
    // });
    // Test: send a invalid id (big number).

    // Test: send a invalid id (string or other)
});