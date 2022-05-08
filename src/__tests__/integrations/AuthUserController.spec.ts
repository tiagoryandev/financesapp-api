/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("controller: Authentication User", () => {
	const app = new App().app;
	const api = request(app);

	beforeAll(async () => {
		await api.post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user_default@auth_user_controller.test",
			password: "password_test"
		});
	});

	test("Will not be possible for the user to authenticate without sending the email or password.", async () => {
		const response = await api.post("/auth");

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_PARAMS");
		expect(response.body).not.toHaveProperty("token");
	});

	test("Will not be possible for the user to authenticate with data with invalid types.", async () => {
		const response = await api.post("/auth").send({
			email: 12345,
			password: true
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_TYPES");
		expect(response.body).not.toHaveProperty("token");
	});

	test("Will not be possible for the user to authenticate with an invalid email.", async () => {
		const response = await api.post("/auth").send({
			email: "user@email_invalid",
			password: "12345"
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_EMAIL");
		expect(response.body).not.toHaveProperty("token");
	});

	test("Will not be possible for the user to authenticate himself without an existing account.", async () => {
		const response = await api.post("/auth").send({
			email: "user_not_exists@auth_user_controller.test",
			password: "password_test"
		});

		expect(response.status).toBe(401);
		expect(response.body.code).toBe("NOT_FOUND_USER");
		expect(response.body).not.toHaveProperty("token");
	});

	test("Will not be possible for the user to authenticate with an incorrect email or password.", async () => {    
		const response = await api.post("/auth").send({
			email: "user_default@auth_user_controller.test",
			password: "password_test_incorrect"
		});

		expect(response.status).toBe(401);
		expect(response.body.code).toBe("EMAIL_OR_PASSWORD_INCORRECT");
		expect(response.body).not.toHaveProperty("token");
	});

	test("Will be possible for the user to authenticate himself with a correct email or password.", async () => {
		const response = await api.post("/auth").send({
			email: "user_default@auth_user_controller.test",
			password: "password_test"
		});

		expect(response.status).toBe(200);
		expect(response.body.code).toBe("TOKEN_GENERATED");
		expect(response.body).toHaveProperty("token");
		expect(response.body).toHaveProperty("user");
	});
});