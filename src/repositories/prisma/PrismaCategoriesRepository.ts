import prismaClient from "../../database";
import Category from "../../entities/Category";
import ICategoriesRepository from "../ICategoriesRepository";

class PrismaCategoriesRepository implements ICategoriesRepository {
	async create({ user_id, name, type }: Category): Promise<Category> {
		const category = await prismaClient.category.create({
			data: {
				user_id,
				name,
				type
			}
		});

		await prismaClient.logCategory.create({
			data: {
				user_id,
				category_id: category.id,
				type: "CREATED"
			}
		});

		return category;
	}
}

export default PrismaCategoriesRepository;