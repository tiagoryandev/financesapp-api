import { Request, Response } from "express";

import DeleteCategoryService from "../services/DeleteCategoryService";

export default class DeleteCategoryController {
	constructor(private deleteCategoryService: DeleteCategoryService) { }
	
	async execute(request: Request<{ category_id: string }>, response: Response) {
		const { user_id } = request;
		const { category_id } = request.params;

		if (isNaN(parseInt(category_id)))
			return response.status(400).json({
				status: 400,
				code: "INVALID_TYPES"
			});

		const result = await this.deleteCategoryService.execute({
			user_id,
			category_id: parseInt(category_id)
		});

		return response.status(result.status).json(result);
	}
}