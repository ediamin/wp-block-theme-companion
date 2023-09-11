import * as vscode from 'vscode';
import { ClassCompletionItemProvider } from './class-completion-item-provider';
import { CssVariableCompletionItemProvider } from './css-variable-completion-item-provider';

export function activate(context: vscode.ExtensionContext) {
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
}

export function deactivate() {}
