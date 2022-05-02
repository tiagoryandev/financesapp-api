import Item from "../../entities/Item";
import IItemsRepository from "../IItemsRepository";

class ItemsRepositoryInMemory implements IItemsRepository {
	private items: Item[] = [];

	async create({ user_id, title, note, value, category_id }: Item): Promise<Item> {
		const item: Item = {
			id: this.items.length + 1,
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

	async getAll(user_id: string): Promise<Item[]> {
		const items = this.items.filter(i => i.user_id == user_id);

		return items;
	}
}

export default ItemsRepositoryInMemory;