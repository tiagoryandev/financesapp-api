import prismaClient from "../../database";
import Category from "../../entities/Category";
import ICategoriesRepository from "../ICategoriesRepository";

class PrismaCategoriesRepository implements ICategoriesRepository {
	async create({ user_id, name, type }: Category): Promise<Category> {
		const category = await prismaClient.category.create({
			data: {
				user_id,
				name,
				type,
				log_categories: {
					create: {
						type: "CATEGORY_CREATED",
						user_id
					}
				}
			}
		});

		return category;
	}

	async exists(id: number, user_id: string): Promise<boolean> {
		const category = await prismaClient.category.findFirst({
			where: {
				id,
				user_id
			}
		});

		return !!category;
	}

	async getAll(user_id: string): Promise<Category[]> {
		const categories = await prismaClient.category.findMany({
			where: {
				user_id
			}
		});

		return categories;
	}

	async delete(user_id: string, category_id: number): Promise<void> {
		await prismaClient.category.delete({
			where: {
				id: category_id
			}
		});
	}
}

export default PrismaCategoriesRepository;