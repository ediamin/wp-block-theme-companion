import { CompletionItemKind } from 'vscode';

export interface CssVariableAggregatorItems {
	[ variable: string ]: {
		value: string;
		preset: any;
		kind: CompletionItemKind;
		detail?: string;
	};
}
