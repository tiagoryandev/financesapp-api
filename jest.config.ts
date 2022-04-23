export default {
	bail: true,
	clearMocks: true,
	coverageProvider: "v8",
	transform: {
		"^.+\\.(t|j)sx?$": ["@swc/jest"],
	},
	testMatch: [
		"**/**/*.spec.ts"
	],
	setupFiles: ["dotenv/config"]
};
