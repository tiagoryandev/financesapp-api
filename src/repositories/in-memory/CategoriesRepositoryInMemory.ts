import { v4 as uuid } from "uuid";

import Category from "../../entities/Category";
import ICategoriesRepository from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
	private categories: Category[] = [];

	async create({ user_id, name, type }: Category): Promise<Category> {
		const category: Category = {
			id: uuid(),
			user_id,
			name,
			type,
			created_at: new Date(),
			updated_at: new Date()
		};

		this.categories.push(category);

		return category;
	}

	async getAll(user_id: string): Promise<Category[]> {
		const categories = this.categories.filter(c => c.user_id === user_id);

		return categories;
	}
}

export default CategoriesRepository;