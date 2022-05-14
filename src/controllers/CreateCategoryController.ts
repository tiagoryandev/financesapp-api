import { Request, Response } from "express";

import CreateCategoryService from "../services/CreateCategoryService";

type RequestData = {
    name: string;
    type: string;
};

export default class CreateCategoryController {
	constructor(private createCategoryService: CreateCategoryService) { }

	async execute(request: Request, response: Response) {
		const { user_id } = request;
		const { name, type }: RequestData = request.body;

		if (!name || !type)
			return response.status(400).json({
				status: 400,
				code: "INVALID_PARAMS"
			});

		if (typeof name != "string" || typeof type != "string")
			return response.status(400).json({
				status: 400,
				code: "INVALID_TYPES"
			});

		if (!["expense", "income"].includes(type))
			return response.status(400).json({
				status: 400,
				code: "INVALID_CATEGORY_TYPE"
			});

		const data = {
			user_id,
			name: name.trim(),
			type
		};

		if (data.name.length < 2 || data.name.length > 32)
			return response.status(400).json({
				status: 400,
				code: "MAX_OR_MIN_NAME_LENGTH"
			});

		const result = await this.createCategoryService.execute(data);

		return response.status(result.status).json(result);
	}
}