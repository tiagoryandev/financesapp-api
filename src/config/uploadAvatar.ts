import "dotenv/config";
import path from "path";
import crypto from "crypto";
import multer from "multer";

const typesStorage = {
	local: multer.diskStorage({
		destination: (request, file, callback) => {
			callback(null, path.resolve(__dirname, "..", "..", "temp", "uploads"));
		},
		filename: (request, file, callback) => {
			crypto.randomBytes(16, (error, hash) => {
				if (error) callback(error, null);
	
				const fileName = `${hash.toString("hex")}-${file.originalname}`;
	
				callback(null, fileName);
			});
		}
	})
};

export default {
	dest: path.resolve(__dirname, "..", "..", "temp", "uploads"),
	storage: typesStorage[process.env.STORAGE_TYPE],
	limits: {
		fileSize: 2 * 1024 * 2014,
	},
	fileFilter: (request, file, callback) => {
		const allowedMimes = [
			"image/jpeg",
			"image/png",
			"image/gif"
		];

		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true);
		} else {
			callback(new Error("INVALID_FILE_TYPE"));
		}
	}
} as multer.Options;