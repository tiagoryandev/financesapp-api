import prismaClient from "../../database";
import Item from "../../entities/Item";
import IItemsRepository from "../IItemsRepository";

class PrismaItemsRepository implements IItemsRepository {
	async create({ user_id, title, note, value, category_id, created_at }: Item): Promise<Item> {
		const item = await prismaClient.item.create({
			data: {
				user_id,
				title,
				note,
				value,
				category_id,
				created_at,
				log_items: {
					create: {
						type: "ITEM_CREATED",
						user_id
					}
				}
			}
		});

		return item;
	}

	async getAll(user_id: string): Promise<Item[]> {
		const items = await prismaClient.item.findMany({
			where: {
				user_id
			}
		});

		return items;
	}
}

export default PrismaItemsRepository;