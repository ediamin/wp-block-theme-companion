import * as assert from 'assert';

import wpThemeJson from '../../../theme-json/wp-theme-json';

import type { ThemeJson } from '../../../types';

suite( 'wpThemeJson: Core preset settings', () => {
	test( 'generates border radius preset variables', async () => {
		const themeJson = {
			version: 2,
			settings: {
				border: {
					radiusSizes: [
						{ name: 'Small', slug: 'small', size: '0.25rem' },
						{ name: 'Pill', slug: 'pill', size: '9999px' },
					],
				},
			},
		} as ThemeJson;

		const { cssVariableAggregatorItems } = await wpThemeJson( themeJson );

		assert.strictEqual(
			cssVariableAggregatorItems[ '--wp--preset--border-radius--small' ].value,
			'0.25rem'
		);
		assert.strictEqual(
			cssVariableAggregatorItems[ '--wp--preset--border-radius--pill' ].value,
			'9999px'
		);
		assert.strictEqual(
			cssVariableAggregatorItems[ '--wp--preset--border-radius--small' ].source,
			'theme'
		);
	} );

	test( 'excludes each disabled core preset group while keeping theme presets', async () => {
		const themeJson = {
			version: 2,
			settings: {
				color: {
					defaultPalette: false,
					defaultGradients: false,
					palette: [ { name: 'Brand', slug: 'brand', color: '#123456' } ],
				},
				shadow: { defaultPresets: false },
				spacing: { defaultSpacingSizes: false },
				typography: { defaultFontSizes: false },
			},
		} as ThemeJson;

		const { cssVariableAggregatorItems } = await wpThemeJson( themeJson );
		const variables = Object.keys( cssVariableAggregatorItems );

		assert.ok( variables.includes( '--wp--preset--color--brand' ) );
		assert.ok( ! variables.includes( '--wp--preset--color--black' ) );
		assert.ok( ! variables.some( ( variable ) => variable.startsWith( '--wp--preset--gradient--' ) ) );
		assert.ok( ! variables.some( ( variable ) => variable.startsWith( '--wp--preset--shadow--' ) ) );
		assert.ok( ! variables.some( ( variable ) => variable.startsWith( '--wp--preset--spacing--' ) ) );
		assert.ok( ! variables.some( ( variable ) => variable.startsWith( '--wp--preset--font-size--' ) ) );
	} );

	test( 'keeps core presets when toggles are omitted', async () => {
		const { cssVariableAggregatorItems } = await wpThemeJson( { version: 2 } );

		assert.ok( cssVariableAggregatorItems[ '--wp--preset--color--black' ] );
		assert.ok( cssVariableAggregatorItems[ '--wp--preset--shadow--natural' ] );
	} );
} );
