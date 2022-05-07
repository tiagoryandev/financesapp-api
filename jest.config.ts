export default {
	bail: true,
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	setupFiles: ["dotenv/config"],
	testMatch: [
		"**/**/*.spec.ts"
	],
	transform: {
		"^.+\\.ts?$": ["@swc/jest"],
	},
};