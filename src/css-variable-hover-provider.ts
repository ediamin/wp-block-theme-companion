import { Hover } from 'vscode';

import getCssVariableDoc from './get-css-variable-doc';

import type { CssVariableAggregatorItems } from './types';
import type { HoverProvider, Position, TextDocument } from 'vscode';

export class CssVariableHoverProvider implements HoverProvider {
	private cssVariableAggregatorItems: CssVariableAggregatorItems = {};

	constructor() {
		this.refreshAggregatorItems();
	}

	provideHover( document: TextDocument, position: Position ) {
		// Find the CSS variable at the current position in the document
		const wordRange = document.getWordRangeAtPosition( position, /var\((--[\w-]+)\)/g );

		if ( ! wordRange ) {
			return undefined;
		}

		// Match the variable name in the wordRange.
		const cssVariable = document.getText( wordRange ).match( /var\(\s*(--[\w-]+)\s*\)/ );

		if ( ! cssVariable ) {
			return undefined;
		}

		// Check if the variable exists in our aggregator items.
		const variableInfo = this.cssVariableAggregatorItems[ cssVariable[ 1 ] ];

		if ( ! variableInfo ) {
			return undefined;
		}

		// The doc item on hover.
		return new Hover( getCssVariableDoc( variableInfo ), wordRange );
	}

	refreshAggregatorItems( aggregatorItems: CssVariableAggregatorItems = {} ) {
		this.cssVariableAggregatorItems = aggregatorItems;
	}
}
