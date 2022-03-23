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
			code: "GET_CATEGORY_LIST",
			message: statusMessages.GET_CATEGORY_LIST,
			categories
		};
	}
}