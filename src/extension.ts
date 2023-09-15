import * as vscode from 'vscode';
import { ClassCompletionItemProvider } from './class-completion-item-provider';
import { CssVariableCompletionItemProvider } from './css-variable-completion-item-provider';

import type { ThemeJson } from './types/types';

async function readThemeJson(): Promise<ThemeJson> {
    console.log( 'from readThemeJson' );

    let themeJson: ThemeJson = {
        version: 2,
    };


    const config = vscode.workspace.getConfiguration();
    const themeJsonPath = config.get( 'wpBlockThemeCompanion.themeJsonPath' ) as string;

    if ( ! themeJsonPath ) {
        vscode.window.showErrorMessage( `theme.json path not found. 'wpBlockThemeCompanion.themeJsonPath' settings is empty.` );
        return themeJson;
    }

    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

    if ( ! workspaceFolder ) {
        vscode.window.showErrorMessage('No workspace folder found.');
        return themeJson;
    }

    const jsonFileUri = vscode.Uri.joinPath(workspaceFolder.uri, themeJsonPath );

    try {
        // Read the JSON file
        const fileContent = await vscode.workspace.fs.readFile(jsonFileUri);

        // Parse the JSON data
        const jsonText = Buffer.from(fileContent).toString('utf8');

        themeJson = JSON.parse(jsonText) as ThemeJson;
    } catch (error) {
        vscode.window.showErrorMessage( `Error reading or parsing JSON file:  ${ themeJsonPath }` );
    }

    return themeJson;
}

export async function activate(context: vscode.ExtensionContext) {
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
        const relativePath = filePath?.replace( `${projectRoot}/`, '' );

        if ( ! relativePath ) {
            return;
        }

        const config = vscode.workspace.getConfiguration();
        config.update(
            'wpBlockThemeCompanion.themeJsonPath',
            relativePath,
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

    const themeJson = await readThemeJson();

    console.log( themeJson );
}

export function deactivate() {}
