import cors from "cors";
import express from "express";
import colors from "colors";

import router from "./routes";

export default class App {
	app: express.Application;

	constructor() {
		this.app = express();

		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.app.use(cors({
			origin: process.env.NODE_ENV == "production" ? process.env.CORS_ORIGIN || "*" : "*"
		}));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
	}

	routes() {
		this.app.use(router);
	}

	run() {
		this.app.listen(process.env.PORT, () => {
			console.log(colors.yellow("[SERVER]") + " Server is Running on Port: " + colors.gray(process.env.PORT));
		});
	}
}