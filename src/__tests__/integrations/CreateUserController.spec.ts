/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("Create User Controller", () => {
	const app = new App().app;

	const usersTests = {
		user_default: {
			first_name: "Tiago",
			last_name: "Ryan",
			email: "tiagoryan@exemple.com",
			password: "12345"
		},
		user_tester: {
			first_name: "Roberto",
			last_name: "Carlos",
			email: "robertocarlos@exemple.com",
			password: "12345"
		}
	};

	it("Should be able to create a new user", async () => {
		const response = await request(app).post("/users").send(usersTests.user_default);

		expect(response.status).toBe(201);
		expect(response.body.user).toHaveProperty("id");
	});

	it("Should not be able to create an existing user", async () => {
		await request(app).post("/users").send(usersTests.user_tester);

		const response = await request(app).post("/users").send(usersTests.user_default);

		expect(response.status).toBe(401);
		expect(response.body.code).toBe("USER_ALREADY_EXISTS");
	});
});