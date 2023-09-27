/* eslint-disable @typescript-eslint/naming-convention */
import * as assert from 'assert';

import getComputedFluidTypographyValue, { type FluidTypographyArgs } from '../../../theme-json/get-computed-fluid-typography-value';

interface DataProvider {
	[testTitle: string]: {
		args: FluidTypographyArgs;
		expected: any;
	}
}

suite('getComputedFluidTypographyValue: Tests that valid font size values are parsed.', () => {
	const dataProvider: DataProvider = {
		'returns clamped value with valid args': {
			args: {
				minimumViewportWidth: '320px',
				maximumViewportWidth: '1000px',
				minimumFontSize: '50px',
				maximumFontSize: '100px',
				scaleFactor: 1,
			},
			expected:
				'clamp(50px, 3.125rem + ((1vw - 3.2px) * 7.353), 100px)',
		},
		'returns `null` when `maximumViewportWidth` is an unsupported unit': {
			args: {
				minimumViewportWidth: '320px',
				maximumViewportWidth: 'calc(100% - 60px)',
				minimumFontSize: '50px',
				maximumFontSize: '100px',
				scaleFactor: 1,
			},
			expected: null,
		},
		'returns `null` when `minimumViewportWidth` is an unsupported unit': {
			args: {
				minimumViewportWidth: 'calc(100% - 60px)',
				maximumViewportWidth: '1000px',
				minimumFontSize: '50px',
				maximumFontSize: '100px',
				scaleFactor: 1,
			},
			expected: null,
		},
		'returns `null` when `minimumFontSize` is an unsupported unit': {
			args: {
				minimumViewportWidth: '320em',
				maximumViewportWidth: '1000em',
				minimumFontSize: '10vw',
				maximumFontSize: '100em',
				scaleFactor: 1,
			},
			expected: null,
		},
		'returns `null` when `maximumFontSize` is an unsupported unit': {
			args: {
				minimumViewportWidth: '320em',
				maximumViewportWidth: '1000em',
				minimumFontSize: '50px',
				maximumFontSize: '100%',
				scaleFactor: 1,
			},
			expected: null,
		},
	};

	Object.keys( dataProvider ).forEach( ( testTitle ) => {
		test( testTitle, () => {
			const rawValue = dataProvider[testTitle].args;
			const expected = dataProvider[testTitle].expected;

			assert.deepEqual( getComputedFluidTypographyValue( rawValue ), expected );
		} );
	} );
});