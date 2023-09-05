import * as vscode from 'vscode';
import classAggregator from './class-aggregator';

import type { CancellationToken, CompletionContext, CompletionItem, CompletionItemProvider, CompletionList, Position, ProviderResult, TextDocument } from 'vscode';

export class ClassCompletionItemProvider implements CompletionItemProvider {

    private completionItems?: PromiseLike<CompletionItem[]>;

    constructor() {
        this.refreshCompletionItems();
    }

    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
        if (! canTriggerCompletion(document, position)) {
            return Promise.reject<vscode.CompletionItem[]>(
                'Not inside html class attribute.'
                );
        }

        return this.completionItems as PromiseLike<vscode.CompletionItem[]>;
    }

    public refreshCompletionItems() {
        this.completionItems = classAggregator().then((cssClasses) => {
            const completionItems = cssClasses.map((cssClass) => {
                const completionItem = new vscode.CompletionItem(cssClass);
                completionItem.detail = `Insert ${cssClass}`;
                completionItem.insertText = cssClass;
                completionItem.kind = vscode.CompletionItemKind.Value;

                // Make sure our completion item group are first.
                completionItem.preselect = true;
                return completionItem;
            });
            return completionItems;
        });
    }
}

type AttributeName = 'class' | 'className';
function canTriggerCompletion(
    document: vscode.TextDocument,
    position: vscode.Position
): boolean {
    const attributeName: AttributeName = [
        'typescriptreact',
        'javascriptreact',
    ].includes(document.languageId)
        ? 'className'
        : 'class';

    const lineUntilCursorPosition = getLineUntilPosition(document, position);
    const textAfterAttributeStart = getTextAfterAttributeStart(
        lineUntilCursorPosition,
        attributeName
    );
    const attributeClosed = isAttributeClosed(
        textAfterAttributeStart,
        attributeName
    );

    return textAfterAttributeStart.length > 1 && attributeClosed;
}

// helper functions
function getLineUntilPosition(
    document: vscode.TextDocument,
    position: vscode.Position
): string {
    return document.getText(
        new vscode.Range(position.with(undefined, 0), position)
    );
}

function getTextAfterAttributeStart(
    lineUntilPosition: string,
    attributeName: AttributeName
): string {
    const lastAttributeOccurrence = lineUntilPosition.lastIndexOf(attributeName);
    return lineUntilPosition.substr(lastAttributeOccurrence);
}

function isAttributeClosed(
    text: string,
    attributeName: AttributeName
): boolean {
    const attributeRegex = new RegExp(
        `${attributeName}=(?:\"[a-zA-Z0-9-\\s]*\"|\'[a-zA-Z0-9-\\s]*\'|.*[=>])`
    );
    return text.search(attributeRegex) === -1;
}
