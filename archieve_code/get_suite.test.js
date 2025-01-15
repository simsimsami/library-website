import request from "supertest";
import Server from "../../../setupServer.js";


describe("Get /books", () => {
    describe("Get request for books")
    test("Response should be 200 for a list of books", async () => {
        const app = new Server().getApp();
        const response = await request(app).get('/get/book/');
        expect(response.statusCode).toBe(200);
    });
    test("Response should be 200 for a single book", async () => {
        const app = new Server().getApp();
        const response = await request(app).get('/get/book/60');
        expect(response.statusCode).toBe(200);
    });
});
