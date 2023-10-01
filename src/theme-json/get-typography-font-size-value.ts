import { empty } from '../utils';

import getComputedFluidTypographyValue from './get-computed-fluid-typography-value';
import getTypographyValueAndUnit from './get-typography-value-and-unit';

import type { FontSizesPreset, SettingsPropertiesTypography, ThemeJson } from '../types';

interface FluidTypographySettings {
	minViewportWidth?: string;
	maxViewportWidth?: string;
	minFontSize?: string;
}

// Mimics the WP core `wp_get_typography_font_size_value` function.
function getTypographyFontSizeValue(
	themeJson: ThemeJson,
	preset: FontSizesPreset,
	shouldUseFluidTypography: boolean = false
): string | number | null {
	if ( typeof preset.size === 'undefined' ) {
		return null;
	}

	/*
	 * Catches empty values and 0/'0'.
	 * Fluid calculations cannot be performed on 0.
	 */
	if ( empty( preset.size ) ) {
		return preset.size;
	}

	// Checks if fluid font sizes are activated.
	const typographySettings: SettingsPropertiesTypography = themeJson?.settings?.typography ?? {};
	const layoutSettings: { wideSize?: string } = themeJson.settings?.layout ?? {};

	shouldUseFluidTypography =
		typographySettings?.fluid !== undefined &&
		( typographySettings.fluid === true || Object.keys( typographySettings?.fluid ?? {} ).length )
			? true
			: shouldUseFluidTypography;

	if ( ! shouldUseFluidTypography ) {
		return preset.size;
	}

	const fluidSettings: FluidTypographySettings = typographySettings?.fluid || {};

	// Defaults.
	const defaultMaximumViewportWidth: string = '1600px';
	const defaultMinimumViewportWidth: string = '320px';
	const defaultMinimumFontSizeFactorMax: number = 0.75;
	const defaultMinimumFontSizeFactorMin: number = 0.25;
	const defaultScaleFactor: number = 1;
	const defaultMinimumFontSizeLimit: string = '14px';

	// Defaults overrides.
	const minimumViewportWidth: string = fluidSettings.minViewportWidth || defaultMinimumViewportWidth;
	let maximumViewportWidth: string = layoutSettings?.wideSize || defaultMaximumViewportWidth;
	if ( fluidSettings.maxViewportWidth ) {
		maximumViewportWidth = fluidSettings.maxViewportWidth;
	}

	const minimumFontSizeLimit: string =
		fluidSettings.minFontSize &&
		typeof fluidSettings.minFontSize === 'string' &&
		fluidSettings.minFontSize.trim() !== ''
			? fluidSettings.minFontSize
			: defaultMinimumFontSizeLimit;

	// Font sizes.
	const fluidFontSizeSettings = preset.fluid;

	// A font size has explicitly bypassed fluid calculations.
	if ( fluidFontSizeSettings === false ) {
		return preset.size;
	}

	// Try to grab explicit min and max fluid font sizes.
	let minimumFontSizeRaw: string | number | null = null;
	let maximumFontSizeRaw: string | number | null = null;

	if ( typeof fluidFontSizeSettings === 'object' ) {
		minimumFontSizeRaw = fluidFontSizeSettings?.min ?? null;
		maximumFontSizeRaw = fluidFontSizeSettings?.max ?? null;
	}

	// Font sizes.
	const preferredSize = getTypographyValueAndUnit( preset.size );

	// Protects against unsupported units.
	if ( ! preferredSize?.unit ) {
		return preset.size;
	}

	// Parses the minimum font size limit, so we can perform checks using it.
	const minimumFontSizeLimitValue = getTypographyValueAndUnit( minimumFontSizeLimit, {
		coerceTo: preferredSize.unit,
	} );

	// Don't enforce minimum font size if a font size has explicitly set a min and max value.
	if ( minimumFontSizeLimitValue?.value && ! minimumFontSizeRaw && ! maximumFontSizeRaw ) {
		/*
		 * If a minimum size was not passed to this function
		 * and the user-defined font size is lower than $minimumFontSizeLimitValue,
		 * do not calculate a fluid value.
		 */
		if ( preferredSize.value <= minimumFontSizeLimitValue.value ) {
			return preset.size;
		}
	}

	// If no fluid max font size is available use the incoming value.
	if ( ! maximumFontSizeRaw ) {
		maximumFontSizeRaw = `${ preferredSize.value }${ preferredSize.unit }`;
	}

	/*
	 * If no minimumFontSize is provided, create one using
	 * the given font size multiplied by the min font size scale factor.
	 */
	if ( ! minimumFontSizeRaw ) {
		const preferredFontSizeInPx: number =
			preferredSize.unit === 'px' ? preferredSize.value : preferredSize.value * 16;

		/*
		 * The scale factor is a multiplier that affects how quickly the curve will move towards the minimum,
		 * that is, how quickly the size factor reaches 0 given increasing font size values.
		 * For a - b * log2(), lower values of b will make the curve move towards the minimum faster.
		 * The scale factor is constrained between min and max values.
		 */
		const minimumFontSizeFactor: number = Math.min(
			Math.max( 1 - 0.075 * Math.log2( preferredFontSizeInPx ), defaultMinimumFontSizeFactorMin ),
			defaultMinimumFontSizeFactorMax
		);
		const calculatedMinimumFontSize: number = parseFloat(
			( preferredSize.value * minimumFontSizeFactor ).toFixed( 3 )
		);

		// Only use calculated min font size if it's > minimumFontSizeLimitValue.
		if (
			minimumFontSizeLimitValue?.value &&
			calculatedMinimumFontSize <= minimumFontSizeLimitValue.value
		) {
			minimumFontSizeRaw = `${ minimumFontSizeLimitValue.value }${ preferredSize.unit }`;
		} else {
			minimumFontSizeRaw = `${ calculatedMinimumFontSize }${ preferredSize.unit }`;
		}
	}

	const fluidFontSizeValue: string | null = getComputedFluidTypographyValue( {
		minimumViewportWidth,
		maximumViewportWidth,
		minimumFontSize: minimumFontSizeRaw.toString(),
		maximumFontSize: maximumFontSizeRaw.toString(),
		scaleFactor: defaultScaleFactor,
	} );

	if ( fluidFontSizeValue !== null ) {
		return fluidFontSizeValue;
	}

	return preset.size;
}

export default getTypographyFontSizeValue;
