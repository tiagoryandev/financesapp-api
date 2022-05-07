import IItemsRepository from "../../repositories/IItemsRepository";
import ItemsRepositoryInMemory from "../../repositories/in-memory/ItemsRepositoryInMemory";
import GetItemListService from "../../services/GetItemListService";

describe("service: Get Item List", () => {
	let itemsRepository: IItemsRepository;
	let getItemListService: GetItemListService;

	beforeAll(() => {
		itemsRepository = new ItemsRepositoryInMemory();
		getItemListService = new GetItemListService(itemsRepository);
	});

	test("Will be possible to select a user's list of items by id", async () => {
		const categories = await getItemListService.execute({
			user_id: "0000-0000-0000-00000"
		});

		expect(categories.status).toBe(200);
		expect(categories.code).toBe("ITEM_LIST_SELECTED");
		expect(categories).toHaveProperty("items");
	});
});