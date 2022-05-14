import IUsersRepository from "../repositories/IUsersRepository";
import IItemsRepository from "../repositories/IItemsRepository";
import statusMessages from "../config/statusMessages.json";

type RequestData = {
    user_id: string;
    item_id: number;
};

export default class DeleteItemService {
	constructor(private usersRepository: IUsersRepository, private itemsRepository: IItemsRepository) { }

	async execute({ user_id, item_id }: RequestData) { 
		const userAlreadyExists = await this.usersRepository.exists("id", user_id);

		if (!userAlreadyExists) return {
			status: 401,
			code: "NOT_FOUND_USER",
			message: statusMessages.conflict.NOT_FOUND_USER
		};

		const itemAlreadyExists = await this.itemsRepository.exists(item_id);

		if (!itemAlreadyExists) return {
			status: 401,
			code: "NOT_FOUND_ITEM",
			message: statusMessages.conflict.NOT_FOUND_ITEM
		};

		await this.itemsRepository.delete(item_id);

		return {
			status: 200,
			code: "ITEM_DELETED",
			message: statusMessages.deleted.ITEM_DELETED
		};
	}
}