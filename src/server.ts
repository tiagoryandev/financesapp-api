import "colors";
import dotenv from "dotenv";
import App from "./app";

if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

const { app } = new App();

app.listen(process.env.PORT, () => {
	console.log("[SERVER]".yellow + " Server is Running on Port: " + process.env.PORT.gray);
});