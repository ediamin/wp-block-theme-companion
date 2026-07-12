import * as Module from 'module';
import * as path from 'path';

import { runTests } from '@vscode/test-electron';
import * as glob from 'glob';
import * as Mocha from 'mocha';

function canRunUnitTestsWithoutVSCode( err: unknown ): boolean {
	const errorMessage = err instanceof Error ? err.message : String( err );

	return /Failed to get JSON|Failed to parse response|403 Forbidden|Tunnel connection failed/.test(
		errorMessage
	);
}

function mockVSCodeModuleForUnitTests() {
	const originalLoad = ( Module as any )._load;

	( Module as any )._load = function loadModule(
		request: string,
		parent: NodeModule | null,
		isMain: boolean
	) {
		if ( request === 'vscode' ) {
			return {
				CompletionItemKind: {
					Text: 0,
					Method: 1,
					Function: 2,
					Constructor: 3,
					Field: 4,
					Variable: 5,
					Class: 6,
					Interface: 7,
					Module: 8,
					Property: 9,
					Unit: 10,
					Value: 11,
					Enum: 12,
					Keyword: 13,
					Snippet: 14,
					Color: 15,
					File: 16,
					Reference: 17,
					Folder: 18,
					EnumMember: 19,
					Constant: 20,
					Struct: 21,
					Event: 22,
					Operator: 23,
					TypeParameter: 24,
				},
			};
		}

		return originalLoad.apply( this, [ request, parent, isMain ] );
	};
}

function runUnitTestsWithoutVSCode(): Promise< void > {
	mockVSCodeModuleForUnitTests();

	const testsRoot = path.resolve( __dirname, './suite' );
	const mocha = new Mocha( {
		ui: 'tdd',
		color: true,
	} );

	return new Promise( ( resolve, reject ) => {
		glob( '**/**.test.js', { cwd: testsRoot }, ( err, files ) => {
			if ( err ) {
				return reject( err );
			}

			files.forEach( ( file ) => mocha.addFile( path.resolve( testsRoot, file ) ) );

			try {
				mocha.run( ( failures ) => {
					if ( failures > 0 ) {
						reject( new Error( `${ failures } tests failed.` ) );
					} else {
						resolve();
					}
				} );
			} catch ( mochaErr ) {
				reject( mochaErr );
			}
		} );
	} );
}

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve( __dirname, '../../' );

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve( __dirname, './suite/index' );

		// Download VS Code, unzip it and run the integration test
		await runTests( { extensionDevelopmentPath, extensionTestsPath } );
	} catch ( err ) {
		if ( canRunUnitTestsWithoutVSCode( err ) ) {
			// eslint-disable-next-line no-console
			console.warn( 'VS Code test runner is unavailable. Running unit tests directly.', err );
			await runUnitTestsWithoutVSCode();
			return;
		}

		// eslint-disable-next-line no-console
		console.error( 'Failed to run tests', err );
		process.exit( 1 );
	}
}

main();
