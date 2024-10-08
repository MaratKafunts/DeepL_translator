module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "react"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		// По желанию добавьте дополнительные правила ESLint или настройки
	},
};
