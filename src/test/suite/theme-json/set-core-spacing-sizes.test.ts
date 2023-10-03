/* eslint-disable @typescript-eslint/naming-convention */
import * as assert from 'assert';

import setCoreSpacingSizes from '../../../theme-json/set-core-spacing-sizes';

import type { SettingsProperties, SpacingScale } from '../../../types';

interface ValidDataProvider {
	[ testTitle: string ]: {
		spacingScale: SpacingScale;
		themeSettings?: SpacingScale;
		expected: {
			name: string;
			slug: string;
			size: string;
		}[];
	};
}

suite(
	'setCoreSpacingSizes: Tests generating the spacing presets array based on the spacing scale provided.',
	() => {
		const dataProvider: ValidDataProvider = {
			one_step_spacing_scale: {
				spacingScale: { operator: '+', increment: 1.5, steps: 1, mediumStep: 4, unit: 'rem' },
				expected: [ { name: '1', slug: '50', size: '4rem' } ],
			},
			two_step_spacing_scale_should_add_step_above_medium: {
				spacingScale: { operator: '+', increment: 1.5, steps: 2, mediumStep: 4, unit: 'rem' },
				expected: [
					{ name: '1', slug: '50', size: '4rem' },
					{ name: '2', slug: '60', size: '5.5rem' },
				],
			},
			three_step_spacing_scale_should_add_step_above_and_below_medium: {
				spacingScale: { operator: '+', increment: 1.5, steps: 3, mediumStep: 4, unit: 'rem' },
				expected: [
					{ name: '1', slug: '40', size: '2.5rem' },
					{ name: '2', slug: '50', size: '4rem' },
					{ name: '3', slug: '60', size: '5.5rem' },
				],
			},
			even_step_spacing_scale_steps_should_add_extra_step_above_medium: {
				spacingScale: { operator: '+', increment: 1.5, steps: 4, mediumStep: 4, unit: 'rem' },
				expected: [
					{ name: '1', slug: '40', size: '2.5rem' },
					{ name: '2', slug: '50', size: '4rem' },
					{ name: '3', slug: '60', size: '5.5rem' },
					{ name: '4', slug: '70', size: '7rem' },
				],
			},
			if_bottom_end_will_go_below_zero_should_add_extra_steps_above_medium_instead: {
				spacingScale: { operator: '+', increment: 2.5, steps: 5, mediumStep: 5, unit: 'rem' },
				expected: [
					{ name: '1', slug: '40', size: '2.5rem' },
					{ name: '2', slug: '50', size: '5rem' },
					{ name: '3', slug: '60', size: '7.5rem' },
					{ name: '4', slug: '70', size: '10rem' },
					{ name: '5', slug: '80', size: '12.5rem' },
				],
			},
			multiplier_should_correctly_calculate_above_and_below_medium: {
				spacingScale: { operator: '*', increment: 1.5, steps: 5, mediumStep: 1.5, unit: 'rem' },
				expected: [
					{ name: '1', slug: '30', size: '0.67rem' },
					{ name: '2', slug: '40', size: '1rem' },
					{ name: '3', slug: '50', size: '1.5rem' },
					{ name: '4', slug: '60', size: '2.25rem' },
					{ name: '5', slug: '70', size: '3.38rem' },
				],
			},
			'increment_<_1_combined_with_*_operator_should_act_as_divisor_to_calculate_above_and_below_medium':
				{
					spacingScale: { operator: '*', increment: 0.25, steps: 5, mediumStep: 1.5, unit: 'rem' },
					expected: [
						{ name: '1', slug: '30', size: '0.09rem' },
						{ name: '2', slug: '40', size: '0.38rem' },
						{ name: '3', slug: '50', size: '1.5rem' },
						{ name: '4', slug: '60', size: '6rem' },
						{ name: '5', slug: '70', size: '24rem' },
					],
				},
			additional_settings_from_user_theme_json: {
				spacingScale: { operator: '*', increment: 0.25, steps: 5, mediumStep: 1.5, unit: 'rem' },
				themeSettings: { increment: 0.15 },
				expected: [
					{ name: '1', slug: '30', size: '0.03rem' },
					{ name: '2', slug: '40', size: '0.22rem' },
					{ name: '3', slug: '50', size: '1.5rem' },
					{ name: '4', slug: '60', size: '10rem' },
					{ name: '5', slug: '70', size: '66.67rem' },
				],
			},
		};

		Object.keys( dataProvider ).forEach( ( testTitle ) => {
			test( testTitle, () => {
				const spacingScale = dataProvider[ testTitle ].spacingScale;
				const themeSettings = dataProvider[ testTitle ].themeSettings ?? {};
				const expected = dataProvider[ testTitle ].expected;

				let coreSettings: SettingsProperties = {
					spacing: {
						spacingScale,
					},
				};

				const settings: SettingsProperties = {
					spacing: {
						spacingScale: themeSettings,
					},
				};

				coreSettings = setCoreSpacingSizes( coreSettings, settings );

				assert.deepEqual( coreSettings.spacing?.spacingSizes, expected );
			} );
		} );
	}
);
