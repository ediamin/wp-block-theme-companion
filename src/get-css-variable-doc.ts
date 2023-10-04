import * as vscode from 'vscode';

import type { CssVariableItem } from './types';

function getCssVariableDoc( details: CssVariableItem ): vscode.MarkdownString {
	let documentation = '';

	switch ( details.kind ) {
		case vscode.CompletionItemKind.Color:
			documentation = `<span style="background-color:${ details.value };">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;${ details.value }`;
			break;
		default:
			documentation = details.value;
			break;
	}

	const markdownString = new vscode.MarkdownString();
	markdownString.supportHtml = true;
	markdownString.appendMarkdown( `value: ${ documentation }` );

	const sourceIndicator = details.source === 'core' ? ' (from wp core)' : '';

	markdownString.appendCodeblock(
		[ `// theme.json${ sourceIndicator }`, JSON.stringify( details.preset, null, 2 ) ].join( '\n' ),
		'jsonc'
	);

	return markdownString;
}

export default getCssVariableDoc;
