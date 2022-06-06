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
				created_at
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

	async exists(item_id: number, user_id: string): Promise<boolean> {
		const item = await prismaClient.item.findFirst({
			where: {
				id: item_id,
				user_id
			}
		});

		return !!item;
	}

	async delete(item_id: number): Promise<void> {
		await prismaClient.item.delete({
			where: {
				id: item_id
			}
		});
	}
}

export default PrismaItemsRepository;