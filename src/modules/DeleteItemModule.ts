import PrismaUsersRepository from "../repositories/prisma/PrismaUsersRepository";
import PrismaItemsRepository from "../repositories/prisma/PrismaItemsRepository";
import DeleteItemService from "../services/DeleteItemService";
import DeleteItemController from "../controllers/DeleteItemController";

export default () => {
	const usersRepository = new PrismaUsersRepository();
	const itemsRepository = new PrismaItemsRepository();
	const deleteItemService = new DeleteItemService(usersRepository, itemsRepository);
	const deleteItemController = new DeleteItemController(deleteItemService);

	return deleteItemController;
};