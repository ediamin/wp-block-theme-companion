/* eslint-disable @typescript-eslint/naming-convention */
import * as assert from 'assert';

import getTypographyFontSizeValue from '../../../theme-json/get-typography-font-size-value';

import type { FontSizesPreset, ThemeJson } from '../../../types';

interface DataProvider {
	[ testTitle: string ]: {
		fontSize: FontSizesPreset;
		shouldUseFluidTypography: boolean;
		expected: any;
	};
}

const themeJson: ThemeJson = {
	version: 2,
};

suite( 'getTypographyFontSizeValue: Tests that valid font size values are parsed.', () => {
	const dataProvider: DataProvider = {
		'returns value when fluid typography is deactivated': {
			fontSize: { size: '28px' },
			shouldUseFluidTypography: false,
			expected: '28px',
		},
		'returns value where font size is 0': {
			fontSize: { size: 0 },
			shouldUseFluidTypography: true,
			expected: 0,
		},
		'returns value where font size is "0"': {
			fontSize: { size: '0' },
			shouldUseFluidTypography: true,
			expected: '0',
		},
		'returns value where `size` is `null`': {
			fontSize: { size: null },
			shouldUseFluidTypography: false,
			expected: null,
		},
		'returns value when fluid is `false`': {
			fontSize: { size: '28px', fluid: false },
			shouldUseFluidTypography: true,
			expected: '28px',
		},
		'returns already clamped value': {
			fontSize: {
				size: 'clamp(21px, 1.313rem + ((1vw - 7.68px) * 2.524), 42px)',
				fluid: false,
			},
			shouldUseFluidTypography: true,
			expected: 'clamp(21px, 1.313rem + ((1vw - 7.68px) * 2.524), 42px)',
		},
		'returns value with unsupported unit': {
			fontSize: { size: '1000%', fluid: false },
			shouldUseFluidTypography: true,
			expected: '1000%',
		},
		'returns clamp value with rem min and max units': {
			fontSize: { size: '1.75rem' },
			shouldUseFluidTypography: true,
			expected: 'clamp(1.119rem, 1.119rem + ((1vw - 0.2rem) * 0.789), 1.75rem)',
		},
		'returns clamp value with em min and max units': {
			fontSize: { size: '1.75em' },
			shouldUseFluidTypography: true,
			expected: 'clamp(1.119em, 1.119rem + ((1vw - 0.2em) * 0.789), 1.75em)',
		},
		'returns clamp value for floats': {
			fontSize: { size: '70.175px' },
			shouldUseFluidTypography: true,
			expected: 'clamp(37.897px, 2.369rem + ((1vw - 3.2px) * 2.522), 70.175px)',
		},
		'coerces integer to `px` and returns clamp value': {
			fontSize: { size: 33 },
			shouldUseFluidTypography: true,
			expected: 'clamp(20.515px, 1.282rem + ((1vw - 3.2px) * 0.975), 33px)',
		},
		'coerces float to `px` and returns clamp value': {
			fontSize: { size: 70.175 },
			shouldUseFluidTypography: true,
			expected: 'clamp(37.897px, 2.369rem + ((1vw - 3.2px) * 2.522), 70.175px)',
		},
		'returns clamp value when `fluid` is empty array': {
			fontSize: { size: '28px', fluid: {} },
			shouldUseFluidTypography: true,
			expected: 'clamp(17.905px, 1.119rem + ((1vw - 3.2px) * 0.789), 28px)',
		},
		'returns clamp value when `fluid` is `null`': {
			fontSize: { size: '28px', fluid: null },
			shouldUseFluidTypography: true,
			expected: 'clamp(17.905px, 1.119rem + ((1vw - 3.2px) * 0.789), 28px)',
		},
		'returns clamp value where min and max fluid values defined': {
			fontSize: {
				size: '80px',
				fluid: { min: '70px', max: '125px' },
			},
			shouldUseFluidTypography: true,
			expected: 'clamp(70px, 4.375rem + ((1vw - 3.2px) * 4.297), 125px)',
		},
		'returns clamp value where max is equal to size': {
			fontSize: {
				size: '7.8125rem',
				fluid: { min: '4.375rem', max: '7.8125rem' },
			},
			shouldUseFluidTypography: true,
			expected: 'clamp(4.375rem, 4.375rem + ((1vw - 0.2rem) * 4.298), 7.8125rem)',
		},
		'returns clamp value if min font size is greater than max': {
			fontSize: { size: '3rem', fluid: { min: '5rem', max: '32px' } },
			shouldUseFluidTypography: true,
			expected: 'clamp(5rem, 5rem + ((1vw - 0.2rem) * -3.75), 32px)',
		},
		'returns value with invalid min/max fluid units': {
			fontSize: { size: '10em', fluid: { min: '20vw', max: '50%' } },
			shouldUseFluidTypography: true,
			expected: '10em',
		},
		'returns value when size is < lower bounds and no fluid min/max set': {
			fontSize: { size: '3px' },
			shouldUseFluidTypography: true,
			expected: '3px',
		},
		'returns value when size is equal to lower bounds and no fluid min/max set': {
			fontSize: { size: '14px' },
			shouldUseFluidTypography: true,
			expected: '14px',
		},
		'returns clamp value with different min max units': {
			fontSize: {
				size: '28px',
				fluid: { min: '20px', max: '50rem' },
			},
			shouldUseFluidTypography: true,
			expected: 'clamp(20px, 1.25rem + ((1vw - 3.2px) * 60.938), 50rem)',
		},
		'returns clamp value where no fluid max size is set': {
			fontSize: { size: '50px', fluid: { min: '2.6rem' } },
			shouldUseFluidTypography: true,
			expected: 'clamp(2.6rem, 2.6rem + ((1vw - 0.2rem) * 0.656), 50px)',
		},
		'returns clamp value where no fluid min size is set': {
			fontSize: { size: '28px', fluid: { max: '80px' } },
			shouldUseFluidTypography: true,
			expected: 'clamp(17.905px, 1.119rem + ((1vw - 3.2px) * 4.851), 80px)',
		},
		'should not apply lower bound test when fluid values are set': {
			fontSize: {
				size: '1.5rem',
				fluid: { min: '0.5rem', max: '5rem' },
			},
			shouldUseFluidTypography: true,
			expected: 'clamp(0.5rem, 0.5rem + ((1vw - 0.2rem) * 5.625), 5rem)',
		},
		'should not apply lower bound test when only fluid min is set': {
			fontSize: { size: '20px', fluid: { min: '12px' } },
			shouldUseFluidTypography: true,
			expected: 'clamp(12px, 0.75rem + ((1vw - 3.2px) * 0.625), 20px)',
		},
		'should not apply lower bound test when only fluid max is set': {
			fontSize: { size: '0.875rem', fluid: { max: '20rem' } },
			shouldUseFluidTypography: true,
			expected: 'clamp(0.875rem, 0.875rem + ((1vw - 0.2rem) * 23.906), 20rem)',
		},
		'returns clamp value when min and max font sizes are equal': {
			fontSize: { size: '4rem', fluid: { min: '30px', max: '30px' } },
			shouldUseFluidTypography: true,
			expected: 'clamp(30px, 1.875rem + ((1vw - 3.2px) * 1), 30px)',
		},
		'should apply scaled min font size for em values when custom min font size is not set': {
			fontSize: { size: '12rem' },
			shouldUseFluidTypography: true,
			expected: 'clamp(5.174rem, 5.174rem + ((1vw - 0.2rem) * 8.533), 12rem)',
		},
		'should apply scaled min font size for px values when custom min font size is not set': {
			fontSize: { size: '200px' },
			shouldUseFluidTypography: true,
			expected: 'clamp(85.342px, 5.334rem + ((1vw - 3.2px) * 8.958), 200px)',
		},
		'should not apply scaled min font size for minimum font size when custom min font size is set': {
			fontSize: { size: '200px', fluid: { min: '100px' } },
			shouldUseFluidTypography: true,
			expected: 'clamp(100px, 6.25rem + ((1vw - 3.2px) * 7.813), 200px)',
		},
	};

	Object.keys( dataProvider ).forEach( ( testTitle ) => {
		test( testTitle, () => {
			const preset = dataProvider[ testTitle ].fontSize;
			const shouldUseFluidTypography = dataProvider[ testTitle ].shouldUseFluidTypography;
			const expected = dataProvider[ testTitle ].expected;

			assert.deepEqual(
				getTypographyFontSizeValue( themeJson, preset, shouldUseFluidTypography ),
				expected
			);
		} );
	} );
} );
