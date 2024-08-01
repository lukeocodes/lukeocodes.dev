const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
	extends: [
		require.resolve("@vercel/style-guide/eslint/node"),
		require.resolve("@vercel/style-guide/eslint/typescript"),
		require.resolve("@vercel/style-guide/eslint/browser"),
		require.resolve("@vercel/style-guide/eslint/react"),
		require.resolve("@vercel/style-guide/eslint/next"),
		// Turborepo custom eslint configuration configures the following rules:
		//  - https://github.com/vercel/turbo/blob/main/packages/eslint-plugin-turbo/docs/rules/no-undeclared-env-vars.md
		"eslint-config-turbo",
	].map(require.resolve),
	parserOptions: {
		project,
	},
	globals: {
		React: true,
		JSX: true,
	},
	settings: {
		"import/resolver": {
			typescript: {
				project,
			},
		},
	},
	ignorePatterns: ["dist/", "**/node_modules/**"],
	// add rules configurations here
	rules: {
		"func-call-spacing": "error",
		"newline-before-return": "error",
		"import/no-default-export": "off",
		// "no-console": ["error", { allow: ["warn", "error"] }],
		"no-console": "off",
		"@typescript-eslint/no-misused-promises": "off",
		"import/no-extraneous-dependencies": "off",
	},
};
