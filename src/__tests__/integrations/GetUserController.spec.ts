/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("controller: Get User", () => {
	const app = new App().app;
	const api = request(app);

	test("Will be possible to search user without the access token expired.", async () => {
		const response = await api.get("/@me");

		expect(response.status).toBe(401);
		expect(response.body.code).toBe("NOT_AUTHENTICATED");
	});

	test("Will be possible to search user without the access token expired.", async () => {
		const response = await api.get("/@me").set("Authorization", "Bearer token.invalid");

		expect(response.status).toBe(401);
		expect(response.body.code).toBe("TOKEN_EXPIRED");
	});

	test("Will be possible to search user without the access token valid.", async () => {
		await api.post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user_exists@get_user_controller.test",
			password: "12345"
		});

		const { body } = await api.post("/auth").send({
			email: "user_exists@get_user_controller.test",
			password: "12345"
		});

		const response = await api.get("/@me").set("Authorization", "Bearer " + body.token);

		expect(response.status).toBe(200);
		expect(response.body.code).toBe("USER_SEARCHED");
		expect(response.body).toHaveProperty("user");
	});
});