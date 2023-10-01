import { CompletionItemKind } from 'vscode';

export interface CssVariableItem {
	value: string;
	preset: any;
	kind: CompletionItemKind;
	detail?: string;
}

export interface CssVariableAggregatorItems {
	[ variable: string ]: CssVariableItem;
}
