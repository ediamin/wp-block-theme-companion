import * as assert from 'assert';

import { CompletionItemKind } from 'vscode';

import getLayoutVariables from '../../../theme-json/get-layout-variables';

import type { CssVariableAggregatorItems, ThemeJson } from '../../../types';

suite( 'getLayoutVariables: Tests generating CSS variables from settings.layout sizes.', () => {
	test( 'adds content and wide layout size variables', () => {
		const themeJson = {
			settings: {
				layout: {
					contentSize: '650px',
					wideSize: '1200px',
				},
			},
		} as ThemeJson;

		const result = getLayoutVariables( themeJson, {} );

		assert.deepEqual( result[ '--wp--style--global--content-size' ], {
			source: 'theme',
			value: '650px',
			preset: {
				settings: {
					layout: {
						contentSize: '650px',
					},
				},
			},
			kind: CompletionItemKind.Variable,
			detail: 'Global content size layout variable.',
		} );
		assert.deepEqual( result[ '--wp--style--global--wide-size' ], {
			source: 'theme',
			value: '1200px',
			preset: {
				settings: {
					layout: {
						wideSize: '1200px',
					},
				},
			},
			kind: CompletionItemKind.Variable,
			detail: 'Global wide size layout variable.',
		} );
	} );

	test( 'does not add layout variables when sizes are missing', () => {
		const themeJson = {
			settings: {
				layout: {
					allowEditing: false,
				},
			},
		} as ThemeJson;
		const aggregatorItems: CssVariableAggregatorItems = {};

		const result = getLayoutVariables( themeJson, aggregatorItems );

		assert.strictEqual( Object.keys( result ).length, 0 );
	} );
} );
