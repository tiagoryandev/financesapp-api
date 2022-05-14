/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";

describe("controller: Delete Category", () => {
	const app = new App().app;
	const api = request(app);

	let userToken: string;
	let categoryID: number;

	beforeAll(async () => {
		await api.post("/users").send({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user@delete_category_controller.test",
			password: "12345"
		});

		const { body } = await api.post("/auth").send({
			email: "user@delete_category_controller.test",
			password: "12345"
		});

		const categoryResponse = await api.post("/categories").set("Authorization", "Bearer " + body.token).send({
			name: "CategoryName",
			type: "income"
		});

		userToken = "Bearer " + body.token;
		categoryID = categoryResponse.body.category.id;
	});

	test("Will not be possible to delete category with category id invalid.", async () => {
		const response = await api.delete("/categories/invalidCategoryID").set("Authorization", userToken);

		expect(response.status).toBe(400);
		expect(response.body.code).toBe("INVALID_TYPES");
	});

	test("Will be possible to delete category with category id exists.", async () => {
		const response = await api.delete("/categories/" + categoryID).set("Authorization", userToken);

		expect(response.status).toBe(200);
		expect(response.body.code).toBe("CATEGORY_DELETED");
	});
});