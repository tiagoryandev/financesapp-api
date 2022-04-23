/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("Create Category Controller", () => {
	const app = new App().app;
	const api = request(app);
    
	it("Should not be able to create a new category with type invalid", async () => {
		await api.post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user@create_category_controller.test",
			password: "12345"
		});

		const { body } = await api.post("/auth").send({
			email: "user@create_category_controller.test",
			password: "12345"
		});

		const response = await api.post("/categories").set("Authorization", "Bearer " + body.token).send({
			name: "CategoryName",
			type: "invalid_type"
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_CATEGORY_TYPE");
	});

	it("Should able to create a new category with credentials corrects", async () => {
		await api.post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user_create@create_category_controller.test",
			password: "12345"
		});

		const { body } = await api.post("/auth").send({
			email: "user_create@create_category_controller.test",
			password: "12345"
		});

		const response = await api.post("/categories").set("Authorization", "Bearer " + body.token).send({
			name: "CategoryName",
			type: "income"
		});

		expect(response.status).toBe(201);
		expect(response.body.code).toBe("CATEGORY_CREATED");
		expect(response.body).toHaveProperty("category");
	});
});