import ICategoriesRepository from "../repositories/ICategoriesRepository";

type RequestData = {
    user_id: string;
};

export default class GetCategoryListService {
	constructor(private categoriesRepository: ICategoriesRepository) { }

	async execute({ user_id }: RequestData) {
		const categories = await this.categoriesRepository.getAll(user_id);

		return {
			status: 200,
			code: "CATEGORY_LIST_SELECTED",
			categories
		};
	}
}