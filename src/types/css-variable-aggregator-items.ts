import { CompletionItemKind } from 'vscode';

export type DataSource = 'core' | 'theme';

export interface CssVariableItem {
	source: DataSource;
	value: string;
	preset: any;
	kind: CompletionItemKind;
	detail?: string;
}

export interface CssVariableAggregatorItems {
	[ variable: string ]: CssVariableItem;
}
