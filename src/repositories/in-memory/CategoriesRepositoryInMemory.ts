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
}

export default CategoriesRepository;