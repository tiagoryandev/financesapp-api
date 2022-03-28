import PrismaUsersRepository from "../repositories/prisma/PrismaUsersRepository";
import PrismaCategoriesRepository from "../repositories/prisma/PrismaCategoriesRepository";
import PrismaItemsRepository from "../repositories/prisma/PrismaItemsRepository";
import CreateItemService from "../services/CreateItemService";
import CreateItemController from "../controllers/CreateItemController";

export default () => {
	const usersRepository = new PrismaUsersRepository();
	const categoriesRepository = new PrismaCategoriesRepository();
	const itemsRepository = new PrismaItemsRepository();
	const createItemService = new CreateItemService(usersRepository, categoriesRepository, itemsRepository);
	const createItemController = new CreateItemController(createItemService);

	return createItemController;
};