import * as assert from 'assert';

import kebabCase from '../../../utils/kebab-case';

interface DataProvider {
	testValue: any;
	expected: string;
}

suite( 'kebabCase: Tests _wp_to_kebab_case().', () => {
	const dataProvider: DataProvider[] = [
		{ testValue: 'white', expected: 'white' },
		{ testValue: 'white+black', expected: 'white-black' },
		{ testValue: 'white:black', expected: 'white-black' },
		{ testValue: 'white*black', expected: 'white-black' },
		{ testValue: 'white.black', expected: 'white-black' },
		{ testValue: 'white black', expected: 'white-black' },
		{ testValue: 'white	black', expected: 'white-black' },
		{ testValue: 'white-to-black', expected: 'white-to-black' },
		{ testValue: 'white2white', expected: 'white-2-white' },
		{ testValue: 'white2nd', expected: 'white-2nd' },
		{ testValue: 'white2ndcolor', expected: 'white-2-ndcolor' },
		{ testValue: 'white2ndColor', expected: 'white-2nd-color' },
		{ testValue: 'white2nd_color', expected: 'white-2nd-color' },
		{ testValue: 'white23color', expected: 'white-23-color' },
		{ testValue: 'white23', expected: 'white-23' },
		{ testValue: '23color', expected: '23-color' },
		{ testValue: 'white4th', expected: 'white-4th' },
		{ testValue: 'font2xl', expected: 'font-2-xl' },
		{ testValue: 'whiteToWhite', expected: 'white-to-white' },
		{ testValue: 'whiteTOwhite', expected: 'white-t-owhite' },
		{ testValue: 'WHITEtoWHITE', expected: 'whit-eto-white' },
		{ testValue: 42, expected: '42' },
		{ testValue: "i've done", expected: 'ive-done' },
		{ testValue: '#ffffff', expected: 'ffffff' },
		{ testValue: '$ffffff', expected: 'ffffff' },
	];

	dataProvider.forEach( ( { testValue, expected } ) => {
		test( `Testing the value: ${ testValue }`, () => {
			assert.strictEqual( kebabCase( testValue ), expected );
		} );
	} );
} );
