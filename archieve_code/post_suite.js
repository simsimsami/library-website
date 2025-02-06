import request from "supertest";
import Server from "../backend/setupServer.js";

describe("Post /bookContrib", () => {
    describe("Sending book_id, contributor_id and contributor_role_id", () => {
        test("Should respond with a 200 status code", async () => {
            const app = new Server().getApp();
            const response = await request(app).post('/post/bookContrib').send({
                book_id: 60,
                contributor_id: '3cb66ffa-e6b2-450f-903e-c1be3b4965f5',
                contribution_role_id: 6
            });
            expect(response.statusCode).toBe(200);
        });
        test("Should specify json in the content type header", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/bookContrib").send({
                book_id: 60,
                contributor_id: '3cb66ffa-e6b2-450f-903e-c1be3b4965f5',
                contribution_role_id: 6
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    });
    describe("When book_id, contributor_id and contributor_role_id is missing", () => {
        test("Should respond with a 400 status code when contributor_role_id key is missing", async () => {
            const app = new Server().getApp();
            const response = await request(app).post('/post/bookContrib').send({
                book_id: 60,
                contributor_id: '3cb66ffa-e6b2-450f-903e-c1be3b4965f5',
            });
            expect(response.statusCode).toBe(400);
        });
        test("Should respond 400 status code when book_id, contributor_id and contributor_role_id are empty", async () => {
            const app = new Server().getApp();
            const response = await request(app).post('/post/bookContrib').send({
                book_id: '',
                contributor_id: '',
                contribution_role_id: ''
            });
            expect(response.statusCode).toBe(400);
        });
        test("Should respond a 400 status code when all book_id, contributor_id and contributor_role_id only have spaces", async () => {
            const app = new Server().getApp();
            const response = await request(app).post('/post/bookContrib').send({
                book_id: ' ',
                contributor_id: ' ',
                contribution_role_id: ' '
            });
            expect(response.statusCode).toBe(400);
        });
    });
});

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
    describe("Contributor_title, contributor_first_name and contributor_last_name is missing", () => {
        test("Sending title, firstname but missing lastname", async () => {
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
        test("When contributor_title, contributor_first_name and contributor_last_name only have a space", async () => {
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

describe("Post /contrib_role", () => {
    describe("Sending contribution_role_title", () => {
        test("Should respond with a 200 status code", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/contrib_role").send({
                contrib_role_title: "test role"
            });
            expect(response.statusCode).toBe(200);
        });
        test("Should specify json in the content type header", async () => {
            const app = new Server().getApp();
            const response = await request(app).post('/post/contrib_role').send({
                contrib_role_title: "test role"
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    });
    describe("When contribution_role_title is missing", () => {
        test("sending key contribution_role_title", async () => {
            const app = new Server().getApp();
            const response = await request(app).post('/post/contrib_role').send({
            });
            expect(response.statusCode).toBe(400);
        });
        test("sending empty contribution_role_title", async () => {
            const app = new Server().getApp();
            const response = await request(app).post('/post/contrib_role').send({
                contrib_role_title: ""
            });
            expect(response.statusCode).toBe(400);
        });
        test("sending only space contribution_role_title", async () => {
            const app = new Server().getApp();
            const response = await request(app).post('/post/contrib_role').send({
                contrib_role_title: " "
            });
            expect(response.statusCode).toBe(400);
        });
    });
});

describe("Post /book", () => {
    describe("Sending book_title, book_release_date, publisher_id and isbn",  () => {
        test("Should respond with a 200 status code", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/book").send({
                book_title: "test title",
                book_release_date: "01/01/2025",
                publisher_id: 12,
                isbn: "111-1-111-11111-1"
            });
            expect(response.statusCode).toBe(200);
        });
        test("Should specify json in the content type header", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/book").send({
                book_title: "test title",
                book_release_date: "01/01/2025",
                publisher_id: 12,
                isbn: "111-1-111-11111-1"
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });
    describe("When book_title, book_release_date, publisher_id and isbn is missing", () => {
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
        test("Return 400 status code when book_title, publisher_id, book_release_date and isbn only have a space inside", async () => {
            const app = new Server().getApp();
            const response = await request(app).post("/post/book").send({
                book_title: " ",
                book_release_date: " ",
                publisher_id: " ",
                isbn: " "
            });
            expect(response.statusCode).toBe(400);
        })
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
    });
    describe("When subject_title is missing", () => {
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
        test("Return 400 status code when subject_title has a space in", async () => {
            const app = new Server().getApp();
            const response = await request(app).post('/post/subject').send({
                subject_title: " "
            });
            expect(response.statusCode).toBe(400);
        });
    });
});

describe("Post /publisher", () => {
    describe("Sending publisher title", () => {

    });
    describe("When data is missing", () => {

    });
});
