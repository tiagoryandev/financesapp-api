/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("Authentication User Controller", () => {
	const app = new App().app;

	it("Should not be able to authenticate user not exists", async () => {
		const response = await request(app).post("/auth").send({
			email: "user_not_exists@auth_user_controller.test",
			password: "password_test"
		});

		expect(response.status).toBe(401);
		expect(response.body.code).toBe("NOT_FOUND_USER");
		expect(response.body).not.toHaveProperty("token");
	});

	it("Should not be able to authenticate user with credentials incorrects", async () => {
		await request(app).post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user_default@auth_user_controller.test",
			password: "password_test"
		});
        
		const response = await request(app).post("/auth").send({
			email: "user_default@auth_user_controller.test",
			password: "password_test_incorrect"
		});

		expect(response.status).toBe(401);
		expect(response.body.code).toBe("EMAIL_OR_PASSWORD_INCORRECT");
		expect(response.body).not.toHaveProperty("token");
	});

	it("Should be able to authenticate user with credentials", async () => {
		await request(app).post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user@auth_user_controller.test",
			password: "password_test"
		});
        
		const response = await request(app).post("/auth").send({
			email: "user@auth_user_controller.test",
			password: "password_test"
		});

		expect(response.status).toBe(200);
		expect(response.body.code).toBe("TOKEN_GENERATED");
		expect(response.body).toHaveProperty("token");
	});
});