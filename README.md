<img src="https://raw.githubusercontent.com/ediamin/wp-block-theme-companion/main/media/banner.png" alt="banner" />

WP Block Theme Companion is a VSCode extension for WordPress Block Theme developers with advanced features such as CSS variable autocompletion, hover preview etc.

## Getting Started
**[Install via the Visual Studio Code Marketplace →](https://marketplace.visualstudio.com/items?itemName=ediamin.wp-block-theme-companion)**

In order to use the extension you must have the `theme.json` file in your workspace. You need to set the theme.json path using `wpBlockThemeCompanion.themeJsonPath` settings. You can set the path easily in two ways:

1. **With the command pallet:** First open your theme.json in VSCode. Then open the command palette and search `WP Block Theme Companion: Use this theme.json`. Select the option and it will set the theme.json path in you workspace settings.

<img src="https://raw.githubusercontent.com/ediamin/wp-block-theme-companion/main/media/set-path-command-palette.png" alt="Set theme.json path using command palette" />

2. **From sidebar explorer file list:** With this method, just right click on your `theme.json` listed in you VSCode sidebar explorer. Then you should see the command `WP Block Theme Companion: Use this theme.json`. Select this, and your theme.json path will set in the workspace settings.

<img src="https://raw.githubusercontent.com/ediamin/wp-block-theme-companion/main/media/set-path-explorer-context.png" alt="Set theme.json path using explorer context menu" />

## Features

### Autocomplete

This extension will generated the CSS variables and their values from the presets defined in your theme.json settings.

<img src="https://raw.githubusercontent.com/ediamin/wp-block-theme-companion/main/media/autocomplete-css-variable.png" alt="CSS variable autocompletion items" />

### Hover Preview

See the CSS variable generated by your theme.json by hover over it.

<img src="https://raw.githubusercontent.com/ediamin/wp-block-theme-companion/main/media/hover-preview-css-variable.png" alt="CSS variable hover preview" />

## Extension Commands

### `wpBlockThemeCompanion.setThemeJsonPath`

Sets the theme.json path relative to the workspace. Follow the Getting Started guide above for more details.

## Extension Settings

### `wpBlockThemeCompanion.themeJsonPath`

This is your theme.json path relative to the workspace. To set the path you can follow the instruction described in Getting Started section above. The CSS variables and their values will generated from [the settings](https://developer.wordpress.org/themes/advanced-topics/theme-json/#settings) of this theme.json.

