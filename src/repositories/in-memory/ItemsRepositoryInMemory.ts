import { v4 as uuid } from "uuid";

import Item from "../../entities/Item";
import IItemsRepository from "../IItemsRepository";

class ItemsRepositoryInMemory implements IItemsRepository {
	private items: Item[] = [];

	async create({ user_id, title, note, value, category_id }: Item): Promise<Item> {
		const item: Item = {
			id: uuid(),
			user_id,
			title,
			note,
			value,
			category_id,
			created_at: new Date(),
			updated_at: new Date()
		};

		this.items.push(item);

		return item;
	}
}

export default ItemsRepositoryInMemory;