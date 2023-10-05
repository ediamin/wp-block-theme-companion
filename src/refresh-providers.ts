import { StatusBarAlignment, ThemeColor, window } from 'vscode';

import { CssVariableHoverProvider } from './css-variable-hover-provider';
import { getThemeJson, getThemeJsonPath, wpThemeJson } from './theme-json';

import type { CssVariableCompletionItemProvider } from './css-variable-completion-item-provider';

interface Providers {
	cssVariableCompletionProvider: CssVariableCompletionItemProvider;
	cssVariableHoverProvider: CssVariableHoverProvider;
}

async function refreshProviders( providers: Providers ) {
	const { cssVariableCompletionProvider, cssVariableHoverProvider } = providers;

	// Get the theme.json path from config.
	const themeJsonPath = getThemeJsonPath();

	// Read the theme.json.
	const themeJson = await getThemeJson( themeJsonPath );

	// Generate the autocompletion data.
	const themeJsonData = await wpThemeJson( themeJson );

	// Refresh autocompletion data and set the data generated from the theme.json.
	cssVariableCompletionProvider.refreshCompletionItems( themeJsonData.cssVariableAggregatorItems );
	cssVariableHoverProvider.refreshAggregatorItems( themeJsonData.cssVariableAggregatorItems );
}

export default refreshProviders;
