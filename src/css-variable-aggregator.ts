import { CompletionItemKind } from "vscode";

interface CssVariableAggregatorItem {
    variable: string;
    value: string;
    kind: CompletionItemKind;
    detail?: string;
}

function cssVariableAggregator(): Thenable<CssVariableAggregatorItem[]> {
    return new Promise((resolve) => {
        resolve([
            { variable: '--wp--preset--color--black', value: '#000', kind: CompletionItemKind.Color, detail: 'Color presets for the color picker.' },
            { variable: '--wp--preset--color--white', value: '#fff', kind: CompletionItemKind.Color },
            { variable: '--wp--preset--color--brand-color-1', value: '#16f5f5', kind: CompletionItemKind.Color },
            { variable: '--wp--preset--color--brand-color-2', value: '#ffdc2e', kind: CompletionItemKind.Color },
            { variable: '--wp--preset--font-family--satoshi', value: '"Satoshi", sans-serif', kind: CompletionItemKind.TypeParameter },
            { variable: '--wp--preset--font-size--large', value: 'clamp( 30px, 1.875rem + ((1vw - 3.2px) * 0.651), 36px)', kind: CompletionItemKind.TypeParameter },
            { variable: '--wp--custom--layout--wide-size', value: '1240px', kind: CompletionItemKind.Variable, detail: 'Sets the max-width of wide (`.alignwide`) content. Also used as the maximum viewport when calculating fluid font sizes' },
        ]);
    });
}

export default cssVariableAggregator;