/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";
 
describe("Get Item List Controller", () => {
	const app = new App().app;
 
	it("Should be able to get the item list", async () => {
		await request(app).post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user@get_item_list_controller.test",
			password: "12345"
		});
 
		const { body } = await request(app).post("/auth").send({
			email: "user@get_item_list_controller.test",
			password: "12345"
		});
 
		const response = await request(app).get("/items").set("Authorization", "Bearer " + body.token);
 
		expect(response.status).toBe(200);
		expect(response.body.code).toBe("ITEM_LIST_SELECTED");
		expect(response.body).toHaveProperty("items");
	});
});