import * as vscode from 'vscode';

import type { ThemeJson } from '../types/theme-json';

// Get the theme.json from the user provided themeJsonPath extension setting.
async function getThemeJson( themeJsonPath: string ): Promise< ThemeJson > {
	let themeJson: ThemeJson = {
		version: 2,
	};

	const workspaceFolder = vscode.workspace.workspaceFolders?.[ 0 ];

	if ( ! workspaceFolder ) {
		vscode.window.showErrorMessage( 'No workspace folder found.' );
		return themeJson;
	}

	const jsonFileUri = vscode.Uri.joinPath( workspaceFolder.uri, themeJsonPath );

	try {
		// Read the JSON file
		const fileContent = await vscode.workspace.fs.readFile( jsonFileUri );

		// Parse the JSON data
		const jsonText = Buffer.from( fileContent ).toString( 'utf8' );
		themeJson = JSON.parse( jsonText ) as ThemeJson;
	} catch ( error ) {
		vscode.window.showErrorMessage( `Error reading or parsing JSON file:  ${ themeJsonPath }` );
	}

	return themeJson;
}

export default getThemeJson;
