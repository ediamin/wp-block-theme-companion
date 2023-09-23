/* eslint-disable @typescript-eslint/naming-convention */
import { CompletionItemKind } from "vscode";
import getTypographyFontSizeValue from './get-typography-font-size-value';

import type { PresetMetadata } from '../types';

const PRESETS_METADATA: PresetMetadata[] = [
    {
        path: [ 'color', 'palette' ],
        valueKey: 'color',
        cssVars: '--wp--preset--color--$slug',
        classes: {
            '.has-$slug-color': 'color',
            '.has-$slug-background-color': 'background-color',
            '.has-$slug-border-color'    : 'border-color',
        },
        kind: CompletionItemKind.Color,
        detail: 'Color palette preset.',
    },
    {
        path: [ 'color', 'gradients' ],
        valueKey: 'gradient',
        cssVars: '--wp--preset--gradient--$slug',
        classes: {
            '.has-$slug-gradient-background': 'background',
        },
        kind: CompletionItemKind.Variable,
        detail: 'Gradient presets.',
    },
    {
        path: [ 'typography', 'fontSizes' ],
        valueFunc: getTypographyFontSizeValue,
        cssVars: '--wp--preset--font-size--$slug',
        classes: {
            '.has-$slug-font-size': 'font-size',
        },
        kind: CompletionItemKind.TypeParameter,
        detail: 'Font size preset.'
    },
    {
        path: [ 'typography', 'fontFamilies' ],
        valueKey: 'fontFamily',
        cssVars: '--wp--preset--font-family--$slug',
        classes: {
            '.has-$slug-font-family': 'font-family',
        },
        kind: CompletionItemKind.TypeParameter,
        detail: 'Font family preset.',
    },
];

export default PRESETS_METADATA;