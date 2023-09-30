import { CompletionItemKind } from 'vscode';

export interface CssVariableAggregatorItem {
	variable: string;
	value: string;
	kind: CompletionItemKind;
	detail?: string;
}
