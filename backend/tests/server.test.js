import request from "supertest";
import Server from "../setupServer";

describe("Post /contrib", () => {
    describe("Sending contributor_title, contributor_first_name and contributor_last_name", () => {
        test("should respond with a 200 status code", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/contrib").send({
                contributor_title: "test title",
                contributor_first_name: "test firstname",
                contributor_last_name: "test lastname"
            });
            expect(response.statusCode).toBe(200);
        });
        test("Should specify json in the content type header", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/contrib").send({
                contributor_title: "test title",
                contributor_first_name: "test firstname",
                contributor_last_name: "test lastname"
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    });
    describe("When contributor_title, contributor_first_name and contributor_last_name is missing", () => {
        test("Sending empty title, firstname and lastname", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/contrib").send({
                contributor_title: "title test",
                contributor_first_name: "title firstname",
            });
            expect(response.statusCode).toBe(400);
        });
        test("When title, firstname and lastname are empty", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/contrib").send({
                contributor_title: " ",
                contributor_first_name: " ",
                contributor_last_name: " "
            });
            expect(response.statusCode).toBe(400);
        })
    });
});

describe("Post /book_contribs", () => {

});

describe("Post /", () => {

});

describe("Get /", () => {

});