import { Request, Response } from "express";

import GetCategoryListService from "../services/GetCategoryListService";

export default class GetCategoryListController {
	constructor(private getCategoryListService: GetCategoryListService) { }

	async execute(request: Request, response: Response) {
		const { user_id } = request;

		const result = await this.getCategoryListService.execute({
			user_id
		});
        
		return response.status(result.status).json(result);
	}
}