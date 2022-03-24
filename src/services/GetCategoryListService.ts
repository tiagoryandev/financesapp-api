import ICategoriesRepository from "../repositories/ICategoriesRepository";

import statusMessages from "../config/statusMessages.json";

interface ICategoryRequest {
    user_id: string;
}

export default class GetCategoryListService {
	constructor(private categoriesRepository: ICategoriesRepository) { }

	async execute({ user_id }: ICategoryRequest) {
		const categories = await this.categoriesRepository.getAll(user_id);

		return {
			status: 200,
			code: "CATEGORY_LIST_SELECTED",
			message: statusMessages.getting.CATEGORY_LIST_SELECTED,
			categories
		};
	}
}