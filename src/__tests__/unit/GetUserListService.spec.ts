import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import IUsersRepository from "../../repositories/IUsersRepository";
import GetUserListService from "../../services/GetUserListService";

describe("service: Get User List", () => {
	let usersRepository: IUsersRepository;
	let getUserListService: GetUserListService;
	let userID: string;
	let adminID: string;

	beforeAll(async () => {
		usersRepository = new UsersRepositoryInMemory();
		getUserListService = new GetUserListService(usersRepository);

		const user = await usersRepository.create({
			first_name: "test",
			last_name: "test",
			email: "email@test.test",
			password: "12345"
		});

		const admin = await usersRepository.create({
			first_name: "test",
			last_name: "test",
			email: "email_admin@test.test",
			role: "ADMIN",
			password: "12345"
		});

		userID = user.id;
		adminID = admin.id;
	});

	test("Will not be possible to get the user list without user already exists.", async () => {
		const result = await getUserListService.execute({
			user_id: "00000-00000-00000-00000"
		});

		expect(result.status).toBe(401);
		expect(result.code).toBe("NOT_FOUND_USER");
	});

	test("Will not be possible to get the user list without be admin.", async () => {
		const result = await getUserListService.execute({
			user_id: userID
		});

		expect(result.status).toBe(401);
		expect(result.code).toBe("PERMISSION_DENIED");
	});
	
	test("Will be possible to get the user list if the user is admin.", async () => {
		const result = await getUserListService.execute({
			user_id: adminID
		});

		expect(result.status).toBe(200);
		expect(result.code).toBe("USER_LIST_SEARCHED");
		expect(result).toHaveProperty("users");
	});
});