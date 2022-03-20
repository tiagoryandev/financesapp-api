import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import IUsersRepository from "../../repositories/IUsersRepository";
import CreateUserService from "../../services/CreateUserService";
import AuthUserService from "../../services/AuthUserService";

describe("Create User Service", () => {
	let usersRepository: IUsersRepository;
	let authUserService: AuthUserService;
	let createUserService: CreateUserService;

	beforeAll(() => {
		usersRepository = new UsersRepositoryInMemory();
		authUserService = new AuthUserService(usersRepository);
		createUserService = new CreateUserService(usersRepository);
	});

	it("Should not be able to authenticate with account not exists", async () => {
		const result = await authUserService.execute({
			email: "user_not_exists@auth_user_service.test",
			password: "password_test"
		});
        
		expect(result.status).toBe(401);
		expect(result.code).toBe("NOT_FOUND_USER");
	});

	it("Should not be able to authenticate with email or password incorrects", async () => {
		await createUserService.execute({
			first_name: "FirstName",
			last_name: "LastName",
			email: "auth_incorrect_credentials@auth_user_service.test",
			password: "password_test"
		});

		const result = await authUserService.execute({
			email: "auth_incorrect_credentials@auth_user_service.test",
			password: "password_incorrect_test"
		});

		expect(result.status).toBe(401);
		expect(result.code).toBe("EMAIL_OR_PASSWORD_INCORRECT");
	});

	it("Should be able to authenticate with email and password corrects", async () => {
		await createUserService.execute({
			first_name: "FirstName",
			last_name: "LastName",
			email: "auth_correct_credentials@auth_user_service.test",
			password: "password_correct"
		});

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