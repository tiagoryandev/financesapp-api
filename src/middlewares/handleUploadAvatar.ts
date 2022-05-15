import multer from "multer";
import { Request, Response, NextFunction } from "express";

import uploadAvatar from "../config/uploadAvatar";

export default async (request: Request, response: Response, next: NextFunction) => {
	const handleUpload = multer(uploadAvatar).single("avatar");
	
	handleUpload(request, response, error => {
		if (error instanceof Error) {
			return response.status(500).json({
				status: 500,
				code: error.message
			});
		}

		next();
	});
};