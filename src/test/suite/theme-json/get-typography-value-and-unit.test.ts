/* eslint-disable @typescript-eslint/naming-convention */
import * as assert from 'assert';

import getTypographyValueAndUnit from '../../../theme-json/get-typography-value-and-unit';

interface ValidDataProvider {
	[ testTitle: string ]: {
		raw_value: string | number;
		expected: any;
	};
}

interface InvalidDataProvider {
	[ testTitle: string ]: any;
}

suite(
	'getTypographyValueAndUnit: Tests that valid font size values are parsed.',
	() => {
		const dataProvider: ValidDataProvider = {
			'size: 10vh with default units do not match': {
				raw_value: '10vh',
				expected: null,
			},
			'size: calc() values do not match': {
				raw_value: 'calc(2 * 10px)',
				expected: null,
			},
			'size: clamp() values do not match': {
				raw_value:
					'clamp(15px, 0.9375rem + ((1vw - 7.68px) * 5.409), 60px)',
				expected: null,
			},
			'size: `"10"`': {
				raw_value: '10',
				expected: { value: 10, unit: 'px' },
			},
			'size: `11`': {
				raw_value: 11,
				expected: { value: 11, unit: 'px' },
			},
			'size: `11.234`': {
				raw_value: '11.234',
				expected: { value: 11.234, unit: 'px' },
			},
			'size: `"12rem"`': {
				raw_value: '12rem',
				expected: { value: 12, unit: 'rem' },
			},
			'size: `"12px"`': {
				raw_value: '12px',
				expected: { value: 12, unit: 'px' },
			},
			'size: `"12em"`': {
				raw_value: '12em',
				expected: { value: 12, unit: 'em' },
			},
			'size: `"12.74em"`': {
				raw_value: '12.74em',
				expected: { value: 12.74, unit: 'em' },
			},
		};

		Object.keys( dataProvider ).forEach( ( testTitle ) => {
			test( testTitle, () => {
				const rawValue = dataProvider[ testTitle ].raw_value;
				const expected = dataProvider[ testTitle ].expected;

				assert.deepEqual(
					getTypographyValueAndUnit( rawValue ),
					expected
				);
			} );
		} );
	}
);

suite(
	'getTypographyValueAndUnit: Tests that invalid font size values are not parsed and trigger incorrect usage.',
	() => {
		const dataProvider: InvalidDataProvider = {
			'size: null': [ null ],
			'size: false': [ false ],
			'size: true': [ true ],
			'size: array': [ [ '10' ] ],
		};

		Object.keys( dataProvider ).forEach( ( testTitle ) => {
			test( testTitle, () => {
				const rawValue = dataProvider[ testTitle ].raw_value;

				assert.strictEqual(
					getTypographyValueAndUnit( rawValue ),
					null
				);
			} );
		} );
	}
);
