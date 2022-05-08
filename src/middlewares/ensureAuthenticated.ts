import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import statusCode from "../config/statusMessages.json";

interface IPayload {
    sub: string;
    email: string;
	role: "USER" | "ADMIN";
}

export default async (request: Request, response: Response, next: NextFunction) => {
	const authToken = request.headers.authorization;

	if (!authToken)
		return response.status(401).json({
			status: 401,
			code: "NOT_AUTHENTICATED",
			message: statusCode["NOT_AUTHENTICATED"]
		});

	const [, token] = authToken.split(" ");

	try {
		const { sub, email, role } = verify(token, process.env.JWT_SECRET_KEY) as IPayload;
    
		request.user_id = sub;
		request.user_email = email;
		request.user_role = role;

		return next();
	} catch (err) {
		return response.status(401).json({
			status: 401,
			code: "TOKEN_EXPIRED",
			message: statusCode["TOKEN_EXPIRED"]
		});
	}
};