import PrismaUsersRepository from "../repositories/prisma/PrismaUsersRepository";
import PrismaCategoriesRepository from "../repositories/prisma/PrismaCategoriesRepository";
import DeleteCategoryService from "../services/DeleteCategoryService";
import DeleteCategoryController from "../controllers/DeleteCategoryController";

export default () => {
	const usersRepository = new PrismaUsersRepository();
	const categoriesRepository = new PrismaCategoriesRepository();
	const deleteCategoryService = new DeleteCategoryService(usersRepository, categoriesRepository);
	const deleteCategoryController = new DeleteCategoryController(deleteCategoryService);

	return deleteCategoryController;
};