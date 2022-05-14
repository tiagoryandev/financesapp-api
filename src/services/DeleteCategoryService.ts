import IUsersRepository from "../repositories/IUsersRepository";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import statusMessages from "../config/statusMessages.json";

type RequestData = {
    user_id: string;
    category_id: number;
};

export default class DeleteCategoryService {
	constructor(private usersRepository: IUsersRepository, private categoriesRepository: ICategoriesRepository) { }

	async execute({ user_id, category_id }: RequestData) {
		const userAlreadyExists = await this.usersRepository.exists("id", user_id);

		if (!userAlreadyExists) return {
			status: 401,
			code: "NOT_FOUND_USER",
			message: statusMessages.conflict.NOT_FOUND_USER
		};

		const categoryAlreadyExists = await this.categoriesRepository.exists(category_id);

		if (!categoryAlreadyExists) return {
			status: 401,
			code: "NOT_FOUND_CATEGORY",
			message: statusMessages.conflict.NOT_FOUND_CATEGORY
		};

		await this.categoriesRepository.delete(category_id);

		return {
			status: 200,
			code: "CATEGORY_DELETED",
			message: statusMessages.deleted.CATEGORY_DELETED
		};
	}
}