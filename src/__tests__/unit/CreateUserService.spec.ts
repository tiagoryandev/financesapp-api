import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import IUsersRepository from "../../repositories/IUsersRepository";
import CreateUserService from "../../services/CreateUserService";

describe("Create User Service", () => {
	let usersRepository: IUsersRepository;
	let createUserService: CreateUserService;

	const usersTests = {
		user_default: {
			first_name: "Tiago",
			last_name: "Ryan",
			email: "tiagoryan@exemple.com",
			password: "12345"
		},
		user_tester: {
			first_name: "Roberto",
			last_name: "Carlos",
			email: "robertocarlos@exemple.com",
			password: "12345"
		}
	};

	beforeAll(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserService = new CreateUserService(usersRepository);
	});

	it("Should be able to create a new user", async () => {
		const result = await createUserService.execute(usersTests.user_default);
        
		expect(result.status).toBe(201);
		expect(result.code).toBe("USER_CREATED");
		expect(result?.user).toHaveProperty("id");
	});

	it("Should not be able to create an existing user", async () => {
		await createUserService.execute(usersTests.user_tester);

		const result = await createUserService.execute(usersTests.user_tester);

		expect(result.status).toBe(401);
		expect(result.code).toBe("USER_ALREADY_EXISTS");
	});
});