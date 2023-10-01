import * as vscode from 'vscode';

import cssVariableAggregator from './css-variable-aggregator';
import getCssVariableDoc from './get-css-variable-doc';
import { CssVariableAggregatorItems } from './types';

import type {
	CompletionItem,
	CompletionItemProvider,
	CompletionList,
	Position,
	ProviderResult,
	TextDocument,
} from 'vscode';

export class CssVariableCompletionItemProvider implements CompletionItemProvider {
	private completionItems?: PromiseLike< CompletionItem[] >;

	constructor() {
		this.refreshCompletionItems();
	}

	provideCompletionItems(
		document: TextDocument,
		position: Position
	): ProviderResult< CompletionItem[] | CompletionList< CompletionItem > > {
		if ( ! canTriggerCompletion( document, position ) ) {
			return [ new vscode.CompletionItem( '' ) ];
		}

		return this.completionItems as PromiseLike< vscode.CompletionItem[] >;
	}

	public refreshCompletionItems( aggregatorItems: CssVariableAggregatorItems = {} ) {
		this.completionItems = cssVariableAggregator( aggregatorItems ).then( ( cssVariable ) => {
			const completionItems = Object.keys( cssVariable ).map( ( variable ) => {
				const item = cssVariable[ variable ];
				const completionItem = new vscode.CompletionItem( variable, item.kind );
				completionItem.insertText = variable;

				if ( item.detail ) {
					completionItem.detail = item.detail;
				}

				completionItem.documentation = getCssVariableDoc( item );

				// Make sure our completion item group are first.
				completionItem.preselect = true;
				return completionItem;
			} );

			return completionItems;
		} );
	}
}

function canTriggerCompletion( document: vscode.TextDocument, position: vscode.Position ): boolean {
	const lineUntilCursorPosition = getLineUntilPosition( document, position );
	const regex = /var\((?![^\)]*\))/;

	return regex.test( lineUntilCursorPosition );
}

function getLineUntilPosition( document: vscode.TextDocument, position: vscode.Position ): string {
	return document.getText( new vscode.Range( position.with( undefined, 0 ), position ) );
}
