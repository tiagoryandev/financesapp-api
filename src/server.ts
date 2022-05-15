import "colors";
import "dotenv/config";
import App from "./app";

const { app } = new App();

const server = app.listen(process.env.PORT, () => {
	console.log(`[SERVER: ${process.pid}]`.yellow + " Server is Running on Port: " + process.env.PORT.gray);
});

process.on("SIGINT", () => {
	console.log(`[SERVER: ${process.pid}]`.red + " Server Ending...");

	server.close(() => process.exit());
});