import dotenv from "dotenv";
import App from "./app";

if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

new App().run();