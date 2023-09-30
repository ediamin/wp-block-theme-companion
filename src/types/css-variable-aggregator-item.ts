import { CompletionItemKind } from 'vscode';

export interface CssVariableAggregatorItem {
	variable: string;
	value: string;
	preset: any;
	kind: CompletionItemKind;
	detail?: string;
}
