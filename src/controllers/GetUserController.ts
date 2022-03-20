import { Request, Response } from "express";

import GetUserService from "../services/GetUserService";

export default class GetUserController {
	constructor(private getUser: GetUserService) { }

	async execute(request: Request, response: Response) {
		const { user_email } = request;

		const result = await this.getUser.execute({ email: user_email });

		return response.status(result.status).json(result);
	}
}