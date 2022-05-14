/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";
 
describe("controller: Delete Item", () => {
	const app = new App().app;
	const api = request(app);
 
	let userToken: string;
	let itemID: number;
 
	beforeAll(async () => {
		await api.post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user@delete_item_controller.test",
			password: "12345"
		});
 
		const { body } = await api.post("/auth").send({
			email: "user@delete_item_controller.test",
			password: "12345"
		});
 
		const categoryResponse = await api.post("/categories").set("Authorization", "Bearer " + body.token).send({
			name: "CategoryName",
			type: "income"
		});

		const itemResponse = await api.post("/items").set("Authorization", "Bearer " + body.token).send({
			title: "Item",
			note: "teste",
			value: 1500,
			category_id: categoryResponse.body.category.id,
			created_at: new Date().toJSON()
		});
 
		userToken = "Bearer " + body.token;
		itemID = itemResponse.body.item.id;
	});
 
	test("Will not be possible to delete item with item id invalid.", async () => {
		const response = await api.delete("/items/invalidItemID").set("Authorization", userToken);
 
		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_TYPES");
	});
 
	test("Will be possible to delete item with item id exists.", async () => {
		const response = await api.delete("/items/" + itemID).set("Authorization", userToken);
 
		expect(response.status).toBe(200);
		expect(response.body.code).toBe("ITEM_DELETED");
	});
});