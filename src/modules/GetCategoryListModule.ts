import PrismaCategoriesRepository from "../repositories/prisma/PrismaCategoriesRepository";
import GetCategoryListService from "../services/GetCategoryListService";
import GetCategoryListController from "../controllers/GetCategoryListController";

export default () => {
	const categoriesRepository = new PrismaCategoriesRepository();
	const getCategoryListService = new GetCategoryListService(categoriesRepository);
	const getCategoryListController = new GetCategoryListController(getCategoryListService);

	return getCategoryListController;
};