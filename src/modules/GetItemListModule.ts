import PrismaItemsRepository from "../repositories/prisma/PrismaItemsRepository";
import GetItemListService from "../services/GetItemListService";
import GetItemListController from "../controllers/GetItemListController";

export default () => {
	const itemsRepository = new PrismaItemsRepository();
	const getItemListService = new GetItemListService(itemsRepository);
	const getItemController = new GetItemListController(getItemListService);

	return getItemController;
};