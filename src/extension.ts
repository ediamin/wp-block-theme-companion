import * as vscode from 'vscode';
import { ClassCompletionItemProvider } from './class-completion-item-provider';

export function activate(context: vscode.ExtensionContext) {
	let classCompletionProvider = new ClassCompletionItemProvider();

	const classCompletionSubscriptions = [ 'html', 'cshtml', 'php' ];

	classCompletionSubscriptions.forEach((selector) => {
        context.subscriptions.push(
            vscode.languages.registerCompletionItemProvider(selector, classCompletionProvider)
        );
	});
}

export function deactivate() {}
