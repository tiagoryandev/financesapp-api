import PrismaUsersRepository from "../repositories/prisma/PrismaUsersRepository";
import PrismaCategoriesRepository from "../repositories/prisma/PrismaCategoriesRepository";
import CreateCategoryService from "../services/CreateCategoryService";
import CreateCategoryController from "../controllers/CreateCategoryController";

export default () => {
	const usersRepository = new PrismaUsersRepository();
	const categoriesRepository = new PrismaCategoriesRepository();
	const createCategoryService = new CreateCategoryService(usersRepository, categoriesRepository);
	const createCategoryController = new CreateCategoryController(createCategoryService);

	return createCategoryController;
};