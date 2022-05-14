import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
    email: string;
}

export default async (request: Request, response: Response, next: NextFunction) => {
	const authToken = request.headers.authorization;

	if (!authToken)
		return response.status(401).json({
			status: 401,
			code: "NOT_AUTHENTICATED"
		});

	const [typeToken, accessToken] = authToken.trim().split(" ");

	if (typeToken !== "Bearer")
		return response.status(401).json({
			status: 401,
			code: "TOKEN_INVALID"
		});

	try {
		const { sub, email } = verify(accessToken, process.env.JWT_SECRET_KEY) as IPayload;
    
		request.user_id = sub;
		request.user_email = email;

		return next();
	} catch (err) {
		return response.status(401).json({
			status: 401,
			code: "TOKEN_EXPIRED"
		});
	}
};