import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";
import statusMessages from "../config/statusMessages.json";

type RequestData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export default class CreateUserController {
	constructor(private createUser: CreateUserService) { }

	async execute(request: Request, response: Response) {
		const { first_name, last_name, email, password }: RequestData = request.body;

		if (!first_name || !last_name || !email || !password)
			return response.status(400).json({
				status: 400,
				code: "INVALID_PARAMS",
				message: statusMessages.invalid.INVALID_PARAMS
			});
            
		if (typeof first_name != "string" || typeof last_name != "string" || typeof email != "string" || typeof password != "string")
			return response.status(400).json({
				status: 400,
				code: "INVALID_TYPES",
				message: statusMessages.invalid.INVALID_TYPES
			});

		const result = await this.createUser.execute({
			first_name,
			last_name,
			email,
			password
		});
        
		return response.status(result.status).json(result);
	}
}