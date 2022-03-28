/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("Create Item Controller", () => {
	const app = new App().app;

	it("Should to able to create a new item", async () => {
		await request(app).post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user@create_item_controller.test",
			password: "12345"
		});

		const { body } = await request(app).post("/auth").send({
			email: "user@create_item_controller.test",
			password: "12345"
		});

		const categoryResponse = await request(app).post("/categories").set("Authorization", "Bearer " + body.token).send({
			name: "CategoryName",
			type: "income"
		});

		const response = await request(app).post("/items").set("Authorization", "Bearer " + body.token).send({
			title: "NewItem",
			note: "NoteItem",
			value: 1000,
			category_id: categoryResponse.body.category.id,
			created_at: "2022-03-01"
		});

		expect(response.status).toBe(201);
		expect(response.body.code).toBe("ITEM_CREATED");
		expect(response.body).toHaveProperty("item");
	});
});