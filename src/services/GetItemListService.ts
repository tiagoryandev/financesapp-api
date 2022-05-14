import IItemsRepository from "../repositories/IItemsRepository";

import statusMessages from "../config/statusMessages.json";

type RequestData = {
    user_id: string;
};

export default class GetItemListService {
	constructor(private itemsRepository: IItemsRepository) { }

	async execute({ user_id }: RequestData) {
		const items = await this.itemsRepository.getAll(user_id);

		return {
			status: 200,
			code: "ITEM_LIST_SELECTED",
			message: statusMessages.getting.ITEM_LIST_SELECTED,
			items
		};
	}
}