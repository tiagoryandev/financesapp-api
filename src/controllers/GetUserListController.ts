import { Request, Response } from "express";

import GetUserListService from "../services/GetUserListService";

export default class GetUserListController {
	constructor(private getUserListService: GetUserListService) { }
    
	async execute(request: Request, response: Response) {
		const { user_id } = request;

		const result = await this.getUserListService.execute({
			user_id
		});

		return response.status(result.status).json(result);
	}
}