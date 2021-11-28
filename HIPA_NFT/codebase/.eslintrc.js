module.exports = {
	env: {
			es6: true,
			node: true,
			jest: true,
	},
	extends: [
			'eslint:recommended',
			'plugin:react/recommended',
			'plugin:react-hooks/recommended',
			'plugin:@typescript-eslint/eslint-recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	parserOptions: {
			project: './tsconfig.json'
	},
	plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
	rules: {
			indent: ['error', 2, { SwitchCase: 1 }],
			quotes: ['error', 'single', { avoidEscape: true }],
			'no-empty-function': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'react/display-name': 'off',
			'react/prop-types': 'off',
			'prettier/prettier': 'error',
			'no-unsafe-assignment': false
	},
	settings: {
			react: {
					version: 'detect',
			},
	},
}