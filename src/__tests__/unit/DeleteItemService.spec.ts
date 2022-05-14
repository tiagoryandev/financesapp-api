import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import CategoriesRepositoryInMemory from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import ItemsRepositoryInMemory from "../../repositories/in-memory/ItemsRepositoryInMemory";
import IUsersRepository from "../../repositories/IUsersRepository";
import ICategoriesRepository from "../../repositories/ICategoriesRepository";
import IItemsRepository from "../../repositories/IItemsRepository";
import DeleteItemService from "../../services/DeleteItemService";

describe("service: Delete Category", () => {
	let userID: string;
	let itemID: number;
	let usersRepository: IUsersRepository;
	let categoriesRepository: ICategoriesRepository;
	let itemsRepository: IItemsRepository;
	let deleteItemService: DeleteItemService;

	beforeAll(async () => {
		usersRepository = new UsersRepositoryInMemory();
		categoriesRepository = new CategoriesRepositoryInMemory();
		itemsRepository = new ItemsRepositoryInMemory();
		deleteItemService = new DeleteItemService(usersRepository, itemsRepository);

		const user = await usersRepository.create({
			first_name: "test",
			last_name: "test",
			email: "user@delete_item.test",
			password: "1245"
		});

		const category = await categoriesRepository.create({
			user_id: user.id,
			name: "test",
			type: "income"
		});

		const item = await itemsRepository.create({
			title: "teste",
			note: "1231231",
			user_id: user.id,
			value: 1234,
			created_at: new Date(),
			category_id: category.id
		});

		userID = user.id;
		itemID = item.id;
	});

	test("Will not be possible to delete the item without user exists.", async () => {
		const result = await deleteItemService.execute({
			user_id: "0000000-00000-00000-00000",
			item_id: 1
		});

		expect(result.status).toBe(401);
		expect(result.code).toBe("NOT_FOUND_USER");
	});

	test("Will not be possible to delete category without item exists.", async () => {
		const result = await deleteItemService.execute({
			user_id: userID,
			item_id: 112312313
		});

		expect(result.status).toBe(401);
		expect(result.code).toBe("NOT_FOUND_ITEM");
	});

	test("Will be possible to delete category with user and item exists.", async () => {
		const result = await deleteItemService.execute({
			user_id: userID,
			item_id: itemID
		});

		expect(result.status).toBe(200);
		expect(result.code).toBe("ITEM_DELETED");
	});
});