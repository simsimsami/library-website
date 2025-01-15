import request from "supertest";
import Server from "../setupServer";

describe("Post /contrib", () => {
    describe("Sending contributor_title, contributor_first_name and contributor_last_name", () => {
        test("Should respond with a 200 status code", async () => {
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
                contributor_title: "",
                contributor_first_name: "",
                contributor_last_name: ""
            });
            expect(response.statusCode).toBe(400);
        });
    });
});

describe("Post /book_contribs", () => {

});

describe("Post /book", () => {
    describe("Sending book_title, book_release_date, publisher_id and isbn",  () => {
        test("Should respond with a 200 status code", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/book").send({
                book_title: "test title",
                book_release_date: "01/01/2025",
                publisher_id: 11,
                isbn: "111-1-111-11111-1"
            });
            expect(response.statusCode).toBe(200);
        });
        test("Should specify json in the content type header", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/book").send({
                book_title: "test title",
                book_release_date: "01/01/2025",
                publisher_id: 11,
                isbn: "111-1-111-11111-1"
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });
    describe("When data is missing", () => {
        test("Return 400 status code when publisher_id and book_release_date are missing", async () => {
            const app = new Server().getApp();
            const response = await request(app).post('/post/book').send({
                book_title: "test book",
                isbn: "111-1-111-11111-1"
            });
            expect(response.statusCode).toBe(400);
        });
        test("Return 400 status code when book_ttile, publisher_id, book_release_date and isbn are empty", async () => {
            const app = new Server().getApp();
            const response = await request(app).post('/post/book').send({
                book_title: "",
                book_release_date: "",
                publisher_id: "",
                isbn: ""
            });
            expect(response.statusCode).toBe(400);
        });
    });
});

describe("Post /subject", () => {
    describe("Sending subject_title", () => {
        test("Should response with 200 status code", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/subject").send({
                subject_title: "test subject",
            });
            expect(response.statusCode).toBe(200);
        });
        test("Should specify json in the content type header", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/subject").send({
                subject_title: "test subject",
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
        describe("When data is missing", () => {
            test("Return 400 status code when subject_title is missing", async () => {
                const app = new Server().getApp();
                const response = await request(app).post("/post/subject").send({    
                    
                });
                expect(response.statusCode).toBe(400);
            });
            test("Return 400 status code when subject_title is empty", async () => {
                const app = new Server().getApp();
                const response = await request(app).post('/post/subject').send({
                    subject_title: ""
                });
                expect(response.statusCode).toBe(400);
            });
        });
    });
})


describe("Get /", () => {

});