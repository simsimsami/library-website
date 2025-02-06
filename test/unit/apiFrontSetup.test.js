import { getRoute } from '../../frontend/src/apiFrontSetup.js';
import { expect, describe, test } from 'vitest';

describe("Unit Test: getRoute", () => {
    test("Test: function getRoute(), testing with a book input", async () => {
        const input = "book";
        const data = await getRoute(input);
    });
    test("getRoute throws an error when no input is provided", async () => {
        await expect(getRoute("")).rejects.toThrow("Empty Input");
    });
    test("getRoute throws an error when no paramater is provided", async () => {
        await expect(getRoute()).rejects.toThrow("No Parameter Input");
    });
});