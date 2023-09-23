import * as vscode from 'vscode';
import coreThemeJson from './core-theme-json';

import type { ThemeJson } from '../types/theme-json';

async function readThemeJson(): Promise<ThemeJson> {
    const themeJson: ThemeJson = {
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
        const customThemeJson = JSON.parse(jsonText) as ThemeJson;

        // Set the themeJson data by merging the custom theme.json data with the core theme.json data.
        themeJson.settings = {
            color: {
                palette: coreThemeJson.settings.color.palette.concat( customThemeJson.settings?.color?.palette ?? [] ),
                gradients: coreThemeJson.settings.color.gradients.concat( customThemeJson.settings?.color?.gradients ?? [] ),
                duotone: coreThemeJson.settings.color.duotone.concat( customThemeJson.settings?.color?.duotone ?? [] ),
            },
            typography: {
                fontSizes: coreThemeJson.settings.typography.fontSizes.concat( customThemeJson.settings?.typography?.fontSizes ?? [] ),
                // Current core theme.json doesn't have fontFamilies property.
                fontFamilies: customThemeJson.settings?.typography?.fontFamilies ?? [],
            },
            spacing: {
                // Current core theme.json doesn't have spacingSizes property.
                spacingSizes: customThemeJson.settings?.spacing?.spacingSizes ?? [],
            },
            shadow: {
                presets: coreThemeJson.settings.shadow.presets.concat( customThemeJson.settings?.shadow?.presets ?? [] ),
            }
        };

    } catch (error) {
        vscode.window.showErrorMessage( `Error reading or parsing JSON file:  ${ themeJsonPath }` );
    }

    return themeJson;
}

export default readThemeJson;