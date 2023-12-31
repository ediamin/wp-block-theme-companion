import { Uri, window, workspace } from 'vscode';

import type { ThemeJson } from '../types/theme-json';

// Get the theme.json from the user provided themeJsonPath extension setting.
async function getThemeJson( themeJsonPath: string ): Promise< ThemeJson > {
	let themeJson: ThemeJson = {
		version: 2,
	};

	const workspaceFolder = workspace.workspaceFolders?.[ 0 ];

	if ( ! workspaceFolder ) {
		window.showErrorMessage( 'No workspace folder found.' );
		return themeJson;
	}

	const jsonFileUri = Uri.joinPath( workspaceFolder.uri, themeJsonPath );

	try {
		// Read the JSON file
		const fileContent = await workspace.fs.readFile( jsonFileUri );

		// Parse the JSON data
		const jsonText = Buffer.from( fileContent ).toString( 'utf8' );
		themeJson = JSON.parse( jsonText ) as ThemeJson;
	} catch ( error ) {
		window.showErrorMessage( `Error reading or parsing JSON file:  ${ themeJsonPath }` );
	}

	return themeJson;
}

export default getThemeJson;
