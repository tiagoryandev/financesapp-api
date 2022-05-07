import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import CategoriesRepositoryInMemory from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import ItemsRepositoryInMemory from "../../repositories/in-memory/ItemsRepositoryInMemory";
import IUsersRepository from "../../repositories/IUsersRepository";
import ICategoriesRepository from "../../repositories/ICategoriesRepository";
import IItemsRepository from "../../repositories/IItemsRepository";
import CreateItemService from "../../services/CreateItemService";
import User from "../../entities/User";

describe("service: Create Item", () => {
	let usersRepository: IUsersRepository;
	let categoriesRepository: ICategoriesRepository;
	let itemsRepository: IItemsRepository;
	let createItemService: CreateItemService;
	let user: User;

	beforeAll(async () => {
		usersRepository = new UsersRepositoryInMemory();
		categoriesRepository = new CategoriesRepositoryInMemory();
		itemsRepository = new ItemsRepositoryInMemory();
		createItemService = new CreateItemService(usersRepository, categoriesRepository, itemsRepository);

		user = await usersRepository.create({
			first_name: "FirstName",
			last_name: "LastName",
			email: "user@create_item_service.test",
			password: "12345"
		});
	});

	test("Will not be possible to create a new item without an existing user.", async () => {
		const result = await createItemService.execute({
			user_id: "00000-0000-0000-00000-invalid",
			title: "Teste",
			note: "Teste",
			value: 12345,
			category_id: Math.floor(Math.random() * 1000),
			created_at: new Date()
		});

		expect(result.status).toBe(401);
		expect(result.code).toBe("NOT_FOUND_USER");
	});

	test("Will not be possible to create a new item with an id of an invalid category.", async () => {
		const result = await createItemService.execute({
			user_id: user.id,
			title: "Teste",
			note: "Teste",
			value: 12345,
			category_id: Math.floor(Math.random() * 1000),
			created_at: new Date()
		});

		expect(result.status).toBe(401);
		expect(result.code).toBe("NOT_FOUND_CATEGORY");
	});

	test("Will be possible to create a new item with valid user and category.", async () => {
		const category = await categoriesRepository.create({
			user_id: user.id,
			name: "CategoryName",
			type: "income"
		});

		const result = await createItemService.execute({
			user_id: user.id,
			title: "Teste",
			note: "Teste",
			value: 12345,
			category_id: category.id,
			created_at: new Date()
		});

		expect(result.status).toBe(201);
		expect(result.code).toBe("ITEM_CREATED");
		expect(result).toHaveProperty("item");
	});
});