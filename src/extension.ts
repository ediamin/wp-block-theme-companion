import * as vscode from 'vscode';

import { ClassCompletionItemProvider } from './class-completion-item-provider';
import { CssVariableCompletionItemProvider } from './css-variable-completion-item-provider';
import { CssVariableHoverProvider } from './css-variable-hover-provider';
import { getThemeJson, wpThemeJson } from './theme-json';

export async function activate( context: vscode.ExtensionContext ) {
	const documentSelectors = [
		'css',
		'html',
		'javascript',
		'javascriptreact',
		'json',
		'jsonc',
		'less',
		'markdown',
		'php',
		'plaintext',
		'scss',
		'sass',
		'typescript',
		'typescriptreact',
		'vue',
		'vue-html',
	];

	const cssVariableCompletionProvider = new CssVariableCompletionItemProvider();
	const cssVariableHoverProvider = new CssVariableHoverProvider();
	const classCompletionProvider = new ClassCompletionItemProvider();

	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider( documentSelectors, cssVariableCompletionProvider ),
		vscode.languages.registerHoverProvider( documentSelectors, cssVariableHoverProvider ),
		vscode.languages.registerCompletionItemProvider( documentSelectors, classCompletionProvider )
	);

	const setThemeJsonFile = vscode.commands.registerCommand(
		'wpBlockThemeCompanion.setThemeJsonPath',
		() => {
			const projectRoot = vscode.workspace.workspaceFolders?.[ 0 ].uri.path ?? '';
			const filePath = vscode.window.activeTextEditor?.document.uri.path ?? '';
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
	cssVariableCompletionProvider.refreshCompletionItems( themeJsonData.cssVariableAggregatorItems );
	cssVariableHoverProvider.refreshAggregatorItems( themeJsonData.cssVariableAggregatorItems );
}

export function deactivate() {}
