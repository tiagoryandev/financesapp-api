export default {
	bail: true,
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	setupFiles: ["dotenv/config"],
	testMatch: [
		"**/unit/*.spec.ts"
	],
	transform: {
		"^.+\\.ts?$": ["@swc/jest"],
	},
};