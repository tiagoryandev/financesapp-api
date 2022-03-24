import IUsersRepository from "../repositories/IUsersRepository";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import statusMessages from "../config/statusMessages.json";

interface ICategoryRequest {
    user_id: string;
    name: string;
    type: string;
}

export default class CreateCategoryService {
	constructor(private usersRepository: IUsersRepository, private categoriesRepository: ICategoriesRepository) { }

	async execute({ user_id, name, type }: ICategoryRequest) {
		const userAlreadyExists = await this.usersRepository.exists("id", user_id);
		
		if (!userAlreadyExists) return {
			status: 401,
			code: "NOT_FOUND_USER",
			message: statusMessages.conflict.NOT_FOUND_USER
		};

		const category = await this.categoriesRepository.create({
			user_id,
			name,
			type
		});

		return {
			status: 201,
			code: "CATEGORY_CREATED",
			message: statusMessages.created.CATEGORY_CREATED,
			category
		};
	}
}