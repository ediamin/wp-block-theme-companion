import { CompletionItemKind, MarkdownString } from 'vscode';

import type { CssVariableItem } from './types';

function getRgbValue( value: string ): string | null {
	const match = value.match( /^#([\da-f]{3}|[\da-f]{6})$/i );

	if ( ! match ) {
		return null;
	}

	const hex =
		match[ 1 ].length === 3
			? match[ 1 ]
					.split( '' )
					.map( ( character ) => character.repeat( 2 ) )
					.join( '' )
			: match[ 1 ];
	const channels = hex.match( /.{2}/g );

	return channels ? `rgb(${ channels.map( ( channel ) => parseInt( channel, 16 ) ).join( ', ' ) })` : null;
}

function getCssVariableDoc( details: CssVariableItem ): MarkdownString {
	let documentation = '';

	switch ( details.kind ) {
		case CompletionItemKind.Color:
			const rgbValue = getRgbValue( details.value );
			const colorValue = rgbValue ? `${ details.value } (${ rgbValue })` : details.value;
			documentation = `<span style="background-color:${ details.value };">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;${ colorValue }`;
			break;
		default:
			documentation = details.value;
			break;
	}

	const markdownString = new MarkdownString();
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
