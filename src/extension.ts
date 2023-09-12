import * as vscode from 'vscode';
import { ClassCompletionItemProvider } from './class-completion-item-provider';
import { CssVariableCompletionItemProvider } from './css-variable-completion-item-provider';

export function activate(context: vscode.ExtensionContext) {
	const classCompletionProvider = new ClassCompletionItemProvider();
	const classCompletionSubscriptions = [ 'html', 'cshtml', 'php' ];

	classCompletionSubscriptions.forEach((selector) => {
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(selector, classCompletionProvider)
        );
	});

    const cssVariableCompletionProvider = new CssVariableCompletionItemProvider();
	const cssVariableCompletionSubscriptions = [ 'html', 'cshtml', 'json' ];

	cssVariableCompletionSubscriptions.forEach((selector) => {
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(selector, cssVariableCompletionProvider)
        );
	});

	const setThemeJsonFile = vscode.commands.registerCommand('wpBlockThemeCompanion.useThisThemeJson', () => {
        const projectRoot = vscode.workspace.workspaceFolders?.[0].uri.path ?? '';
        const filePath = vscode.window.activeTextEditor?.document.uri.path ?? '';
        const relativePath = filePath?.replace( projectRoot, '' );

        if ( ! relativePath ) {
            return;
        }

        const config = vscode.workspace.getConfiguration();
        config.update(
            'wpBlockThemeCompanion.themeJsonPath',
            `\${workspaceFolder}${ relativePath }`,
            vscode.ConfigurationTarget.Workspace
        ).then(
            () => {
                vscode.window.showInformationMessage( 'Your theme.json added to the settings successfully.' );
            },
            () => {
                vscode.window.showErrorMessage( 'Could not add the theme.json to the settings. Please try again.' );
            }
        );
	});

	context.subscriptions.push( setThemeJsonFile );
}

export function deactivate() {}
