import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import IUsersRepository from "../../repositories/IUsersRepository";
import CreateUserService from "../../services/CreateUserService";

describe("Create User Service", () => {
	let usersRepository: IUsersRepository;
	let createUserService: CreateUserService;

	beforeAll(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserService = new CreateUserService(usersRepository);
	});

	it("Should be able to create a new user", async () => {
		const result = await createUserService.execute({
			first_name: "FirstName",
			last_name: "LastName",
			email: "create_new_user@create_user_service.test",
			password: "password_test"
		});
        
		expect(result.status).toBe(201);
		expect(result.code).toBe("USER_CREATED");
		expect(result?.user).toHaveProperty("id");
	});

	it("Should not be able to create an existing user", async () => {
		await createUserService.execute({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user_exists@create_user_service.test",
			password: "password_test"
		});

		const result = await createUserService.execute({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user_exists@create_user_service.test",
			password: "password_test"
		});

		expect(result.status).toBe(401);
		expect(result.code).toBe("USER_ALREADY_EXISTS");
	});
});