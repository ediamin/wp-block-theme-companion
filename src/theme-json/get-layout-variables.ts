import { CompletionItemKind } from 'vscode';

import type { CssVariableAggregatorItems, ThemeJson } from '../types';

const LAYOUT_VARIABLES = [
	{
		setting: 'contentSize',
		variable: '--wp--style--global--content-size',
		detail: 'Global content size layout variable.',
	},
	{
		setting: 'wideSize',
		variable: '--wp--style--global--wide-size',
		detail: 'Global wide size layout variable.',
	},
] as const;

// `WP_Theme_JSON::compute_style_properties` counterpart for settings.layout sizes.
function getLayoutVariables(
	themeJson: ThemeJson,
	cssVariableAggregatorItems: CssVariableAggregatorItems
): CssVariableAggregatorItems {
	const layoutSettings = themeJson.settings?.layout;

	if ( ! layoutSettings || typeof layoutSettings !== 'object' || Array.isArray( layoutSettings ) ) {
		return cssVariableAggregatorItems;
	}

	LAYOUT_VARIABLES.forEach( ( { setting, variable, detail } ) => {
		const value = layoutSettings[ setting ];

		if ( typeof value !== 'string' || ! value ) {
			return;
		}

		cssVariableAggregatorItems[ variable ] = {
			source: 'theme',
			value,
			preset: {
				settings: {
					layout: {
						[ setting ]: value,
					},
				},
			},
			kind: CompletionItemKind.Variable,
			detail,
		};
	} );

	return cssVariableAggregatorItems;
}

export default getLayoutVariables;
