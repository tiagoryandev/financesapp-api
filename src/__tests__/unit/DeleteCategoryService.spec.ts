import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import CategoriesRepositoryInMemory from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import IUsersRepository from "../../repositories/IUsersRepository";
import ICategoriesRepository from "../../repositories/ICategoriesRepository";
import DeleteCategoryService from "../../services/DeleteCategoryService";

describe("service: Delete Category", () => {
	let userID: string;
	let categoryID: number;
	let usersRepository: IUsersRepository;
	let categoriesRepository: ICategoriesRepository;
	let deleteCategoryService: DeleteCategoryService;

	beforeAll(async () => {
		usersRepository = new UsersRepositoryInMemory();
		categoriesRepository = new CategoriesRepositoryInMemory();
		deleteCategoryService = new DeleteCategoryService(usersRepository, categoriesRepository);

		const user = await usersRepository.create({
			first_name: "test",
			last_name: "test",
			email: "user@delete_category.test",
			password: "1245"
		});

		const category = await categoriesRepository.create({
			user_id: user.id,
			name: "test",
			type: "income"
		});

		userID = user.id;
		categoryID = category.id;
	});

	test("Will not be possible to delete category without user exists.", async () => {
		const result = await deleteCategoryService.execute({
			user_id: "0000000-00000-00000-00000",
			category_id: 1
		});

		expect(result.status).toBe(401);
		expect(result.code).toBe("NOT_FOUND_USER");
	});

	test("Will not be possible to delete category without category exists.", async () => {
		const result = await deleteCategoryService.execute({
			user_id: userID,
			category_id: 1213123
		});

		expect(result.status).toBe(401);
		expect(result.code).toBe("NOT_FOUND_CATEGORY");
	});

	test("Will be possible to delete category with user and category exists.", async () => {
		const result = await deleteCategoryService.execute({
			user_id: userID,
			category_id: categoryID
		});

		expect(result.status).toBe(200);
		expect(result.code).toBe("CATEGORY_DELETED");
	});
});