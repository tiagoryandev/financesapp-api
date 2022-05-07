import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import IUsersRepository from "../../repositories/IUsersRepository";
import CreateUserService from "../../services/CreateUserService";
import AuthUserService from "../../services/AuthUserService";

describe("service: Create User", () => {
	let usersRepository: IUsersRepository;
	let authUserService: AuthUserService;
	let createUserService: CreateUserService;

	beforeAll(async () => {
		usersRepository = new UsersRepositoryInMemory();
		authUserService = new AuthUserService(usersRepository);
		createUserService = new CreateUserService(usersRepository);

		await createUserService.execute({
			first_name: "FirstName",
			last_name: "LastName",
			email: "auth_correct_credentials@auth_user_service.test",
			password: "password_correct"
		});
	});

	test("Will not be able to authenticate without an existing account.", async () => {
		const result = await authUserService.execute({
			email: "user_not_exists@auth_user_service.test",
			password: "password_test"
		});
        
		expect(result.status).toBe(401);
		expect(result.code).toBe("NOT_FOUND_USER");
	});

	test("Will not be able to authenticate with incorrect email or password.", async () => {
		const result = await authUserService.execute({
			email: "auth_correct_credentials@auth_user_service.test",
			password: "password_incorrect_test"
		});

		expect(result.status).toBe(401);
		expect(result.code).toBe("EMAIL_OR_PASSWORD_INCORRECT");
	});

	test("Will be possible to authenticate with correct email and password.", async () => {
		const result = await authUserService.execute({
			email: "auth_correct_credentials@auth_user_service.test",
			password: "password_correct"
		});

		expect(result.status).toBe(200);
		expect(result.code).toBe("TOKEN_GENERATED");
		expect(result).toHaveProperty("token");
		expect(result).toHaveProperty("user");
	});
});