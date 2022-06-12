/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("controller: Not Found Endpoint", () => {
	const app = new App().app;
	const api = request(app);

	test("Will be not possible to get not found endpoint", async () => {
		const response = await api.get("/not_found");

		expect(response.status).toBe(404);
		expect(response.body.code).toBe("NOT_FOUND_ENDPOINT");
	});
});