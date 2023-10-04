import { CompletionItemKind } from 'vscode';

import { kebabCase } from '../utils';

import type { CssVariableAggregatorItems, ThemeJson } from '../types';

function flattenTree(
	input: Record< string, any >,
	prefix: string,
	token: string,
	path: Array< string >,
	cssVariableAggregatorItems: CssVariableAggregatorItems
): CssVariableAggregatorItems {
	Object.keys( input ).forEach( ( key ) => {
		const newKey = prefix + kebabCase( key.replace( '/', '-' ) );
		const newLeaf = input[ key ];

		if ( newLeaf instanceof Object ) {
			const newPrefix = newKey + token;
			cssVariableAggregatorItems = flattenTree(
				newLeaf,
				newPrefix,
				token,
				[ key, ...path ],
				cssVariableAggregatorItems
			);
		} else {
			const variablePath = structuredClone( path );
			variablePath.unshift( key );

			const preset = variablePath.reduce( ( pathObj, currentPath, index ) => {
				return index === 0 ? { [ currentPath ]: newLeaf } : { [ currentPath ]: pathObj };
			}, {} );

			cssVariableAggregatorItems[ newKey ] = {
				source: 'theme',
				value: newLeaf,
				preset,
				kind: CompletionItemKind.Variable,
				detail: 'Custom CSS variable.',
			};
		}
	} );

	return cssVariableAggregatorItems;
}

// `WP_Theme_JSON::compute_theme_vars` counterpart.
// Generates the variables from `settings.custom`.
function getCustomVariables(
	themeJson: ThemeJson,
	cssVariableAggregatorItems: CssVariableAggregatorItems
): CssVariableAggregatorItems {
	if ( ! themeJson.settings?.custom ) {
		return cssVariableAggregatorItems;
	}

	if ( ! Object.keys( themeJson.settings.custom ).length ) {
		return cssVariableAggregatorItems;
	}

	cssVariableAggregatorItems = flattenTree(
		themeJson.settings.custom,
		'--wp--custom--',
		'--',
		[],
		cssVariableAggregatorItems
	);

	return cssVariableAggregatorItems;
}

export default getCustomVariables;
