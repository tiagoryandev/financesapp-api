import { Request, Response } from "express";

import AuthUserService from "../services/AuthUserService";
import statusMessages from "../config/statusMessages.json";

type RequestData = {
    email: string;
    password: string;
}

export default class AuthUserController {
	constructor(private authUserService: AuthUserService) { }

	async execute(request: Request, response: Response) {
		const { email, password }: RequestData = request.body;

		if (!email || !password)
			return response.status(400).json({
				status: 400,
				code: "INVALID_PARAMS",
				message: statusMessages.INVALID_PARAMS
			});
            
		if (typeof email != "string" || typeof password != "string")
			return response.status(400).json({
				status: 400,
				code: "INVALID_TYPES",
				message: statusMessages.INVALID_TYPES
			});

		const result = await this.authUserService.execute({
			email,
			password
		});
        
		return response.status(result.status).json(result);
	}
}