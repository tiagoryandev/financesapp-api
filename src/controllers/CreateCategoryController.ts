import { Request, Response } from "express";

import CreateCategoryService from "../services/CreateCategoryService";
import statusMessages from "../config/statusMessages.json";

type RequestData = {
    name: string;
    type: string;
};

export default class CreateCategoryController {
	constructor(private createCategory: CreateCategoryService) { }

	async execute(request: Request, response: Response) {
		const { user_id } = request;
		const { name, type }: RequestData = request.body;

		if (!name || !type)
			return response.status(400).json({
				status: 400,
				code: "INVALID_PARAMS",
				message: statusMessages.invalid.INVALID_PARAMS
			});

		if (typeof name != "string" || typeof type != "string")
			return response.status(400).json({
				status: 400,
				code: "INVALID_TYPES",
				message: statusMessages.invalid.INVALID_TYPES
			});

		if (!["expense", "income"].includes(type))
			return response.status(400).json({
				status: 400,
				code: "INVALID_CATEGORY_TYPE",
				message: statusMessages.invalid.INVALID_CATEGORY_TYPE
			});

		const result = await this.createCategory.execute({
			user_id,
			name,
			type
		});

		return response.status(result.status).json(result);
	}
}