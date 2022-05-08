/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest";

import App from "../../app";
import PrismaUsersRepository from "../../repositories/prisma/PrismaUsersRepository";
import CreateUserService from "../../services/CreateUserService";

describe("controller: Get User List", () => {
	const app = new App().app;
	const api = request(app);
    
	let userToken: string;
	let usersRepository: PrismaUsersRepository;
	let createUserService: CreateUserService;

	beforeAll(async () => {
		usersRepository = new PrismaUsersRepository();
		createUserService = new CreateUserService(usersRepository);

		await createUserService.execute({
			first_name: "Admin",
			last_name: "Admin",
			email: "admin@admin.com",
			role: "ADMIN",
			password: "12345"
		});

		const { body } = await api.post("/auth").send({
			email: "admin@admin.com",
			password: "12345"
		});

		userToken = "Bearer " + body.token;
	});

	test("Will be possible to get user list with user admin", async () => {
		const response = await api.get("/users").set("Authorization", userToken);

		expect(response.status).toBe(200);
		expect(response.body.code).toBe("USER_LIST_SEARCHED");
		expect(response.body).toHaveProperty("users");
	});
});