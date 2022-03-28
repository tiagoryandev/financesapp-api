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
						type: "CREATED",
						user_id
					}
				}
			}
		});

		return item;
	}
}

export default PrismaItemsRepository;