import type { CompletionItemKind } from "vscode";
import type { ThemeJson } from './theme-json';

export interface PresetMetadata {
    // Based on the `WP_Theme_JSON::PRESETS_METADATA` constant.
    path: string[];
    valueKey?: string;
    valueFunc?: ( preset: any, themeJson: ThemeJson ) => any;
    cssVars: string;
    classes: Record<string, string>;
    // Custom props required to generated autocompletion data.
    kind: CompletionItemKind;
    detail: string; // Based on the theme.json schema.
}