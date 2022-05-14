import { Request, Response } from "express";

import DeleteItemService from "../services/DeleteItemService";

export default class DeleteItemController {
	constructor(private deleteItemService: DeleteItemService) { }

	async execute(request: Request<{ item_id: string }>, response: Response) {
		const { user_id } = request;
		const { item_id } = request.params;

		if (isNaN(parseInt(item_id)))
			return response.status(400).json({
				status: 400,
				code: "INVALID_TYPES"
			});

		const result = await this.deleteItemService.execute({
			user_id,
			item_id: parseInt(item_id)
		});

		return response.status(result.status).json(result);
	}
}