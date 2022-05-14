import { Request, Response } from "express";

import CreateItemService from "../services/CreateItemService";
import { isDate } from "../helpers/validation";
import statusMessages from "../config/statusMessages.json";

type RequestData = {
    title: string;
    note: string;
    value: number;
    category_id: number;
    created_at: string;
};

export default class CreateItemController {
	constructor(private createItemService: CreateItemService) { }

	async execute(request: Request, response: Response) {
		const { user_id } = request;
		const { title, note, value, category_id, created_at }: RequestData = request.body;

		if (!title || !note || !value || !category_id || !created_at)
			return response.status(400).json({
				status: 400,
				code: "INVALID_PARAMS",
				message: statusMessages.invalid.INVALID_PARAMS
			});

		if (typeof title != "string" || typeof note != "string" || typeof value != "number" || typeof category_id != "number" || typeof created_at != "string")
			return response.status(400).json({
				status: 400,
				code: "INVALID_TYPES",
				message: statusMessages.invalid.INVALID_TYPES
			});

		if (!isDate(created_at.trim().split(" ")[0])) 
			return response.status(400).json({
				status: 400,
				code: "INVALID_DATE",
				message: statusMessages.invalid.INVALID_DATE
			});

		const data = {
			user_id,
			title: title.trim(),
			note: note.trim(),
			value: Math.abs(value),
			category_id: category_id,
			created_at: new Date(created_at.trim().split(" ")[0])
		};

		if (data.title.length < 2 || data.title.length > 32)
			return response.status(400).json({
				status: 400,
				code: "MAX_OR_MIN_TITLE_LENGTH",
				message: statusMessages.invalid.MAX_OR_MIN_TITLE_LENGTH
			});

		if (data.note.length < 2 || data.note.length > 2048)
			return response.status(400).json({
				status: 400,
				code: "MAX_OR_MIN_NOTE_LENGTH",
				message: statusMessages.invalid.MAX_OR_MIN_NOTE_LENGTH
			});

		const result = await this.createItemService.execute(data);

		return response.status(result.status).json(result);
	}
}