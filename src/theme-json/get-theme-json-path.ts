import { workspace } from 'vscode';

function getThemeJsonPath(): string {
	const config = workspace.getConfiguration();
	return config.get( 'wpBlockThemeCompanion.themeJsonPath' ) as string;
}

export default getThemeJsonPath;
