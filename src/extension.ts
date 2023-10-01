import * as vscode from 'vscode';

import { ClassCompletionItemProvider } from './class-completion-item-provider';
import { CssVariableCompletionItemProvider } from './css-variable-completion-item-provider';
import { CssVariableHoverProvider } from './css-variable-hover-provider';
import getCssVariableDoc from './get-css-variable-doc';
import { getThemeJson, wpThemeJson } from './theme-json';

export async function activate( context: vscode.ExtensionContext ) {
	const classCompletionProvider = new ClassCompletionItemProvider();
	const classCompletionSubscriptions = [ 'html', 'cshtml', 'php' ];

	classCompletionSubscriptions.forEach( ( selector ) => {
		context.subscriptions.push(
			vscode.languages.registerCompletionItemProvider(
				selector,
				classCompletionProvider
			)
		);
	} );

	const cssVariableCompletionProvider =
		new CssVariableCompletionItemProvider();
	const cssVariableHoverProvider = new CssVariableHoverProvider();
	const cssVariableCompletionSubscriptions = [
		'html',
		'cshtml',
		'json',
		'css',
		'less',
		'scss',
	];

	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(
			cssVariableCompletionSubscriptions,
			cssVariableCompletionProvider
		),
		vscode.languages.registerHoverProvider(
			cssVariableCompletionSubscriptions,
			cssVariableHoverProvider
		)
	);

	const setThemeJsonFile = vscode.commands.registerCommand(
		'wpBlockThemeCompanion.useThisThemeJson',
		() => {
			const projectRoot =
				vscode.workspace.workspaceFolders?.[ 0 ].uri.path ?? '';
			const filePath =
				vscode.window.activeTextEditor?.document.uri.path ?? '';
			const relativePath = filePath?.replace( `${ projectRoot }/`, '' );

			if ( ! relativePath ) {
				return;
			}

			const config = vscode.workspace.getConfiguration();
			config
				.update(
					'wpBlockThemeCompanion.themeJsonPath',
					relativePath,
					vscode.ConfigurationTarget.Workspace
				)
				.then(
					() => {
						vscode.window.showInformationMessage(
							'Your theme.json added to the settings successfully.'
						);
					},
					() => {
						vscode.window.showErrorMessage(
							'Could not add the theme.json to the settings. Please try again.'
						);
					}
				);
		}
	);

	context.subscriptions.push( setThemeJsonFile );

	// Read the theme.json.
	const themeJson = await getThemeJson();

	// If no theme.json is provided or the json does not have settings
	// then do not proceed.
	if ( ! themeJson.settings ) {
		return;
	}

	// Generate the autocompletion data.
	const themeJsonData = await wpThemeJson( themeJson );

	// Refresh autocompletion data and set the data generated from the theme.json.
	cssVariableCompletionProvider.refreshCompletionItems(
		themeJsonData.cssVariableAggregatorItems
	);

	cssVariableHoverProvider.refreshAggregatorItems(
		themeJsonData.cssVariableAggregatorItems
	);
}

export function deactivate() {}
