/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("Create User Controller", () => {
	const app = new App().app;
	const api = request(app);

	it("Should be able to create a new user", async () => {
		const response = await api.post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "create_new_user@create_user_controller.test",
			password: "password_test"
		});

		expect(response.status).toBe(201);
		expect(response.body.user).toHaveProperty("id");
	});

	it("Should not be able to create an existing user", async () => {
		await api.post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "create_new_user_exists@create_user_controller.test",
			password: "password_test"
		});

		const response = await api.post("/users").send({
			first_name: "Roberto",
			last_name: "Carlos",
			email: "create_new_user_exists@create_user_controller.test",
			password: "password_test"
		});

		expect(response.status).toBe(401);
		expect(response.body.code).toBe("USER_ALREADY_EXISTS");
		expect(response.body).not.toHaveProperty("user");
	});
});