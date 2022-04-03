import IItemsRepository from "../../repositories/IItemsRepository";
import ItemsRepositoryInMemory from "../../repositories/in-memory/ItemsRepositoryInMemory";
import GetItemListService from "../../services/GetItemListService";

describe("Get Item List Service", () => {
	let itemsRepository: IItemsRepository;
	let getItemListService: GetItemListService;

	beforeAll(() => {
		itemsRepository = new ItemsRepositoryInMemory();
		getItemListService = new GetItemListService(itemsRepository);
	});

	it("Should be able to get the item list with user id", async () => {
		const categories = await getItemListService.execute({
			user_id: "0000-0000-0000-00000"
		});

		expect(categories.status).toBe(200);
		expect(categories.code).toBe("ITEM_LIST_SELECTED");
		expect(categories).toHaveProperty("items");
	});
});