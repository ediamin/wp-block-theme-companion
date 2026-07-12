import { run } from './suite';

async function main() {
	try {
		await run();
	} catch ( err ) {
		// eslint-disable-next-line no-console
		console.error( 'Failed to run tests', err );
		process.exit( 1 );
	}
}

main();
