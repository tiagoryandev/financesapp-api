import { Request, Response } from "express";

export default class NotFoundEndpointController {
	async execute(request: Request, response: Response) {
		return response.status(404).json({
			status: 404,
			code: "NOT_FOUND_ENDPOINT"
		});
	}
}