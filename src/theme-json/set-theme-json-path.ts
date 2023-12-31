import { ConfigurationTarget, window, workspace } from 'vscode';

function setThemeJsonPath( afterSetup: () => void ) {
	const projectRoot = workspace.workspaceFolders?.[ 0 ].uri.path ?? '';
	const filePath = window.activeTextEditor?.document.uri.path ?? '';
	const relativePath = filePath?.replace( `${ projectRoot }/`, '' );

	if ( ! relativePath ) {
		return false;
	}

	const config = workspace.getConfiguration();
	config.update( 'wpBlockThemeCompanion.themeJsonPath', relativePath, ConfigurationTarget.Workspace ).then(
		() => {
			window.showInformationMessage( 'Your theme.json added to the settings successfully.' );
			afterSetup();
		},
		() => {
			window.showErrorMessage( 'Could not add the theme.json to the settings. Please try again.' );
		}
	);
}

export default setThemeJsonPath;
