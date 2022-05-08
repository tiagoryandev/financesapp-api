/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("controller: Create User", () => {
	const app = new App().app;
	const api = request(app);

	test("Will not be possible to create a new user with invalid params.", async () => {
		const response = await api.post("/users");

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_PARAMS");
	});

	test("Will not be possible to create a new user with invalid type params.", async () => {
		const response = await api.post("/users").send({
			first_name: 1234,
			last_name: 1234,
			email: 123123123,
			password: 123123
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_TYPES");
	});

	test("Will not be possible to create a new user with name shorter than 2 and longer than 32 characters.", async () => {
		const response = await api.post("/users").send({
			first_name: "tiago12312312312312312313212312313123123123123123123123123123123",
			last_name: "12313",
			email: "tiagoryan@gmail.test",
			password: "124"
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("MAX_OR_MIN_NAME_LENGTH");
	});

	test("Will not be possible to create a new user with invalid email.", async () => {
		const response = await api.post("/users").send({
			first_name: "tiago",
			last_name: "ryan",
			email: "tiago-ryan@gmail",
			password: "124"
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_EMAIL");
	});

	test("Will be possible to create a new user with valid params.", async () => {
		const response = await api.post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "create_new_user@create_user_controller.test",
			password: "password_test"
		});

		expect(response.status).toBe(201);
		expect(response.body.user).toHaveProperty("id");
	});

	test("Will not be possible to create a new user already exists.", async () => {
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