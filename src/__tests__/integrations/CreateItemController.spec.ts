/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("controller: Create Item", () => {
	let userToken: string;
	let categoryID: string;

	const app = new App().app;
	const api = request(app);

	beforeAll(async () => {
		await api.post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user@create_item_controller.test",
			password: "12345"
		});

		const { body } = await api.post("/auth").send({
			email: "user@create_item_controller.test",
			password: "12345"
		});

		const categoryResponse = await api.post("/categories").set("Authorization", "Bearer " + body.token).send({
			name: "CategoryName",
			type: "income"
		});

		userToken = "Bearer " + body.token;
		categoryID = categoryResponse.body.category.id;
	});

	test("Will not be possible to create a new item without submitting the title, grade, value, category id and creation date.", async () => {
		const response = await api.post("/items").set("Authorization", userToken);

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_PARAMS");
	});

	test("Will not be possible to create a new item with invalid data types.", async () => {
		const response = await api.post("/items").set("Authorization", userToken).send({
			title: 123,
			note: 123,
			value: "123123",
			category_id: 1231231,
			created_at: 1231213
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_TYPES");
	});

	test("Will not be possible to create a new item with an invalid date.", async () => {
		const response = await api.post("/items").set("Authorization", userToken).send({
			title: "ItemName",
			note: "Note",
			value: 1500,
			category_id: categoryID,
			created_at: "1231231231212312331"
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_DATE");
	});

	test("Will not be possible to create a new item with a title shorter than 2 and longer than 32 characters.", async () => {
		const response = await api.post("/items").set("Authorization", userToken).send({
			title: "ItemName123123213123123123123123123123131231312313111123123123121231323123",
			note: "Note",
			value: 1500,
			category_id: categoryID,
			created_at: new Date().toJSON()
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("MAX_OR_MIN_TITLE_LENGTH");
	});

	test("Will not be possible to create a new item with a note shorter than 2 and longer than 32 characters.", async () => {
		const response = await api.post("/items").set("Authorization", userToken).send({
			title: "ItemName",
			note: "1",
			value: 1500,
			category_id: categoryID,
			created_at: new Date().toJSON()
		});

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("MAX_OR_MIN_NOTE_LENGTH");
	});

	test("Will be possible to create a new item with correct data.", async () => {
		const response = await api.post("/items").set("Authorization", userToken).send({
			title: "NewItem",
			note: "NoteItem",
			value: 1000,
			category_id: categoryID,
			created_at: "2022-03-01"
		});

		expect(response.status).toBe(201);
		expect(response.body.code).toBe("ITEM_CREATED");
		expect(response.body).toHaveProperty("item");
	});
});
