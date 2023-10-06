import { CompletionItem, Range } from 'vscode';

import cssVariableAggregator from './css-variable-aggregator';
import getCssVariableDoc from './get-css-variable-doc';
import { CssVariableAggregatorItems } from './types';

import type { CompletionItemProvider, CompletionList, Position, ProviderResult, TextDocument } from 'vscode';

export class CssVariableCompletionItemProvider implements CompletionItemProvider {
	private completionItems?: PromiseLike< CompletionItem[] >;

	constructor() {
		this.refreshCompletionItems();
	}

	provideCompletionItems(
		document: TextDocument,
		position: Position
	): ProviderResult< CompletionItem[] | CompletionList< CompletionItem > > {
		if ( ! this.canTriggerCompletion( document, position ) ) {
			return [ new CompletionItem( '' ) ];
		}

		return this.completionItems as PromiseLike< CompletionItem[] >;
	}

	public refreshCompletionItems( aggregatorItems: CssVariableAggregatorItems = {} ) {
		this.completionItems = cssVariableAggregator( aggregatorItems ).then( ( cssVariable ) => {
			const completionItems = Object.keys( cssVariable ).map( ( variable ) => {
				const item = cssVariable[ variable ];
				const completionItem = new CompletionItem( variable, item.kind );
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

	protected canTriggerCompletion( document: TextDocument, position: Position ): boolean {
		const regex = /var\((?![^\)]*\))/;
		const lineUntilCursorPosition = document.getText(
			new Range( position.with( undefined, 0 ), position )
		);

		return regex.test( lineUntilCursorPosition );
	}
}
