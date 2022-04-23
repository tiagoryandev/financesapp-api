/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("Get Category List Controller", () => {
	const app = new App().app;
	const api = request(app);

	it("Should be able to get the category list", async () => {
		await api.post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user@get_category_list_controller.test",
			password: "12345"
		});

		const { body } = await api.post("/auth").send({
			email: "user@get_category_list_controller.test",
			password: "12345"
		});

		const response = await api.get("/categories").set("Authorization", "Bearer " + body.token);

		expect(response.status).toBe(200);
		expect(response.body.code).toBe("CATEGORY_LIST_SELECTED");
		expect(response.body).toHaveProperty("categories");
	});
});