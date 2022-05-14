import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";
import { validateEmail } from "../helpers/validation";

type RequestData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export default class CreateUserController {
	constructor(private createUserService: CreateUserService) { }

	async execute(request: Request, response: Response) {
		const { first_name, last_name, email, password }: RequestData = request.body;

		if (!first_name || !last_name || !email || !password)
			return response.status(400).json({
				status: 400,
				code: "INVALID_PARAMS"
			});
            
		if (typeof first_name != "string" || typeof last_name != "string" || typeof email != "string" || typeof password != "string")
			return response.status(400).json({
				status: 400,
				code: "INVALID_TYPES"
			});

		const data = {
			first_name: first_name.trim(),
			last_name: last_name.trim(),
			email: email.trim().split(" ")[0],
			password: password
		};

		if (data.first_name.length < 2 || data.first_name.length > 32 || data.last_name.length < 2 || data.last_name.length > 32)
			return response.status(400).json({
				status: 400,
				code: "MAX_OR_MIN_NAME_LENGTH"
			});

		if (!validateEmail.test(data.email))
			return response.status(400).json({
				status: 400,
				code: "INVALID_EMAIL"
			});

		const result = await this.createUserService.execute(data);
        
		return response.status(result.status).json(result);
	}
}