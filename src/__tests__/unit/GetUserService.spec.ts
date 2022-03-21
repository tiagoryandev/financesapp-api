import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import IUsersRepository from "../../repositories/IUsersRepository";
import GetUserService from "../../services/GetUserService";
import CreateUserService from "../../services/CreateUserService";

describe("Get User Service", () => {
	let usersRepository: IUsersRepository;
	let getUserService: GetUserService;
	let createUserService: CreateUserService;

	beforeAll(() => {
		usersRepository = new UsersRepositoryInMemory();
		getUserService = new GetUserService(usersRepository);
		createUserService = new CreateUserService(usersRepository);
	});

	it("Should not be able to get user not exists", async () => {
		const result = await getUserService.execute({
			id: "09121212-1231-21-31129129"
		});
        
		expect(result.status).toBe(401);
		expect(result.code).toBe("NOT_FOUND_USER");
	});

	it("Should be able to get user", async () => {
		const userExists = await createUserService.execute({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user_exists@get_user_service.test",
			password: "1234"
		});

		const result = await getUserService.execute({
			id: userExists.user.id
		});

		expect(result.status).toBe(200);
		expect(result).toHaveProperty("user");
	});
});