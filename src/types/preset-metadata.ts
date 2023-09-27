import type { CompletionItemKind } from "vscode";
import type { ThemeJson } from './theme-json';

export interface PresetMetadata {
    // Based on the `WP_Theme_JSON::PRESETS_METADATA` constant.
    path: string[];
    valueKey?: string;
    valueFunc?: ( themeJson: ThemeJson, preset: any ) => any;
    cssVars: string;
    classes: Record<string, string>;
    // Custom props required to generated autocompletion data.
    kind: CompletionItemKind;
    detail: string; // Based on the theme.json schema.
}