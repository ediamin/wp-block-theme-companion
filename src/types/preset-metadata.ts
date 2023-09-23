import type { CompletionItemKind } from "vscode";

export interface PresetMetadata {
    // Based on the `WP_Theme_JSON::PRESETS_METADATA` constant.
    path: string[];
    valueKey?: string;
    valueFunc?: ( preset: any ) => any;
    cssVars: string;
    classes: Record<string, string>;
    // Custom props required to generated autocompletion data.
    kind: CompletionItemKind;
    detail: string; // Based on the theme.json schema.
}