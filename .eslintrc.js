module.exports = {
	root: true,
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	rules: {
		'import/no-unresolved': [ 2, { ignore: [ '^vscode$' ] } ],
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'parent',
					'sibling',
					'index',
					'type',
				],
				alphabetize: {
					caseInsensitive: true,
					order: 'asc',
				},
				pathGroupsExcludedImportTypes: [ 'type' ],
				'newlines-between': 'always',
			},
		],
		'sort-imports': [
			'error',
			{
				// Handled by the import/order.
				ignoreDeclarationSort: true,
			},
		],
	},
};
