import { ExtensionContext, commands, languages, workspace } from 'vscode';

import { ClassCompletionItemProvider } from './class-completion-item-provider';
import { CssVariableCompletionItemProvider } from './css-variable-completion-item-provider';
import { CssVariableHoverProvider } from './css-variable-hover-provider';
import refreshProviders from './refresh-providers';
import { getThemeJsonPath, setThemeJsonPath } from './theme-json';

export async function activate( context: ExtensionContext ) {
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

	// Providers.
	const cssVariableCompletionProvider = new CssVariableCompletionItemProvider();
	const cssVariableHoverProvider = new CssVariableHoverProvider();
	const classCompletionProvider = new ClassCompletionItemProvider();

	const doRefreshProviders = () => {
		refreshProviders( {
			cssVariableCompletionProvider,
			cssVariableHoverProvider,
		} );
	};

	// Commands.
	const setThemeJsonPathCommand = commands.registerCommand( 'wpBlockThemeCompanion.setThemeJsonPath', () =>
		setThemeJsonPath( doRefreshProviders )
	);

	// Subscribe to the context.
	context.subscriptions.push(
		setThemeJsonPathCommand,
		languages.registerCompletionItemProvider( documentSelectors, cssVariableCompletionProvider ),
		languages.registerHoverProvider( documentSelectors, cssVariableHoverProvider ),
		languages.registerCompletionItemProvider( documentSelectors, classCompletionProvider ),
		// Referesh providers everytime we save the theme.json.
		workspace.onDidChangeTextDocument( ( e ) => {
			const projectRoot = workspace.workspaceFolders?.[ 0 ].uri.path ?? '';
			const filePath = e.document.uri.path ?? '';
			const relativePath = filePath?.replace( `${ projectRoot }/`, '' );

			if ( relativePath !== getThemeJsonPath() ) {
				return;
			}

			doRefreshProviders();
		} )
	);

	// Get the theme.json path from config.
	const themeJsonPath = getThemeJsonPath();

	// If no theme.json is provided or the json does not have settings then do not proceed.
	if ( ! themeJsonPath ) {
		return;
	}

	// It executes on activation when the theme.json path is already set.
	doRefreshProviders();
}

export function deactivate() {}
