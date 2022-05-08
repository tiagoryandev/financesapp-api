/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("controller: Create Category", () => {
	let userToken: string; 

	const app = new App().app;
	const api = request(app);

	beforeAll(async () => {
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

		userToken = "Bearer " + body.token;
	});
    
	test("Will not be possible to create a new category without submitting and name and type.", async () => {
		const response = await api.post("/categories").set("Authorization", userToken);

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_PARAMS");
	});

	test("Will not be possible to create a new category with data with invalid types.", async () => {
		const response = await api.post("/categories").set("Authorization", userToken).send({
			name: 123,
			type: true
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_TYPES");
	});

	test("Will not be possible to create a new category with the invalid category type.", async () => {
		const response = await api.post("/categories").set("Authorization", userToken).send({
			name: "CategoryName",
			type: "invalid_type"
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_CATEGORY_TYPE");
	});

	test("Will not be possible to create a new category with the name shorter than 2 or longer than 32 characters.", async () => {
		const response = await api.post("/categories").set("Authorization", userToken).send({
			name: "CategoryName12345678912344624324111241241",
			type: "expense"
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("MAX_OR_MIN_NAME_LENGTH");
	});

	test("Will be possible to create a new category with correct data.", async () => {
		const response = await api.post("/categories").set("Authorization", userToken).send({
			name: "CategoryName",
			type: "income"
		});

		expect(response.status).toBe(201);
		expect(response.body.code).toBe("CATEGORY_CREATED");
		expect(response.body).toHaveProperty("category");
	});
});