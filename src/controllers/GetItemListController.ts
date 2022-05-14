import { Request, Response } from "express";

import GetItemListService from "../services/GetItemListService";

export default class GetItemListController {
	constructor(private getItemListService: GetItemListService) { }

	async execute(request: Request, response: Response) {
		const { user_id } = request;

		const result = await this.getItemListService.execute({
			user_id
		});

		return response.status(result.status).json(result);
	}
}