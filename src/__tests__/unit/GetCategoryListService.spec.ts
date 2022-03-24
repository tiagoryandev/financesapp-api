import ICategoriesRepository from "../../repositories/ICategoriesRepository";
import CategoriesRepositoryInMemory from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import GetCategoryListService from "../../services/GetCategoryListService";

describe("Get Category List Service", () => {
	let categoriesRepository: ICategoriesRepository;
	let getCategoryListService: GetCategoryListService;

	beforeAll(() => {
		categoriesRepository = new CategoriesRepositoryInMemory();
		getCategoryListService = new GetCategoryListService(categoriesRepository);
	});

	it("Should be able to get the category list with user id", async () => {
		const categories = await getCategoryListService.execute({
			user_id: "0000-0000-0000-00000"
		});

		expect(categories.status).toBe(200);
		expect(categories.code).toBe("CATEGORY_LIST_SELECTED");
		expect(categories).toHaveProperty("categories");
	});
});