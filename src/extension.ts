import * as vscode from 'vscode';

import { ClassCompletionItemProvider } from './class-completion-item-provider';
import { CssVariableCompletionItemProvider } from './css-variable-completion-item-provider';
import { CssVariableHoverProvider } from './css-variable-hover-provider';
import { getThemeJson, getThemeJsonPath, setThemeJsonPath, wpThemeJson } from './theme-json';

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

	// Commands.
	const setThemeJsonPathCommand = vscode.commands.registerCommand(
		'wpBlockThemeCompanion.setThemeJsonPath',
		setThemeJsonPath
	);

	// Providers.
	const cssVariableCompletionProvider = new CssVariableCompletionItemProvider();
	const cssVariableHoverProvider = new CssVariableHoverProvider();
	const classCompletionProvider = new ClassCompletionItemProvider();

	// Subscribe to the context.
	context.subscriptions.push(
		setThemeJsonPathCommand,
		vscode.languages.registerCompletionItemProvider( documentSelectors, cssVariableCompletionProvider ),
		vscode.languages.registerHoverProvider( documentSelectors, cssVariableHoverProvider ),
		vscode.languages.registerCompletionItemProvider( documentSelectors, classCompletionProvider )
	);

	// Get the theme.json path from config.
	const themeJsonPath = getThemeJsonPath();

	// If no theme.json is provided or the json does not have settings then do not proceed.
	if ( ! themeJsonPath ) {
		return;
	}

	// Read the theme.json.
	const themeJson = await getThemeJson( themeJsonPath );

	// Generate the autocompletion data.
	const themeJsonData = await wpThemeJson( themeJson );

	// Refresh autocompletion data and set the data generated from the theme.json.
	cssVariableCompletionProvider.refreshCompletionItems( themeJsonData.cssVariableAggregatorItems );
	cssVariableHoverProvider.refreshAggregatorItems( themeJsonData.cssVariableAggregatorItems );
}

export function deactivate() {}
