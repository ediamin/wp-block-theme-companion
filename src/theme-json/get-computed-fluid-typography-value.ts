import getTypographyValueAndUnit from './get-typography-value-and-unit';

export interface FluidTypographyArgs {
	maximumViewportWidth?: string;
	minimumViewportWidth?: string;
	maximumFontSize?: string;
	minimumFontSize?: string;
	scaleFactor?: number;
}

function getComputedFluidTypographyValue( args: FluidTypographyArgs = {} ): string | null {
	const {
		maximumViewportWidth: maximumViewportWidthRaw,
		minimumViewportWidth: minimumViewportWidthRaw,
		maximumFontSize: maximumFontSizeRaw,
		minimumFontSize: minimumFontSizeRaw,
		scaleFactor,
	} = args;

	const minimumFontSize = getTypographyValueAndUnit( minimumFontSizeRaw );

	const fontSizeUnit = minimumFontSize?.unit || 'rem';

	const maximumFontSize = getTypographyValueAndUnit( maximumFontSizeRaw, {
		coerceTo: fontSizeUnit,
	} );

	if ( ! maximumFontSize || ! minimumFontSize ) {
		return null;
	}

	const maximumViewportWidth = getTypographyValueAndUnit( maximumViewportWidthRaw, {
		coerceTo: fontSizeUnit,
	} );

	const minimumViewportWidth = getTypographyValueAndUnit( minimumViewportWidthRaw, {
		coerceTo: fontSizeUnit,
	} );

	if ( ! minimumViewportWidth || ! maximumViewportWidth ) {
		return null;
	}

	const viewportWidthOffset = `${ parseFloat(
		( minimumViewportWidth.value / 100 ).toFixed( 3 )
	) }${ fontSizeUnit }`;
	const linearFactor =
		100 *
		( ( maximumFontSize.value - minimumFontSize.value ) /
			( maximumViewportWidth.value - minimumViewportWidth.value ) );
	const linearFactorScaled = parseFloat( ( ( linearFactor || 1 ) * ( scaleFactor || 1 ) ).toFixed( 3 ) );

	const minimumFontSizeRem = getTypographyValueAndUnit( minimumFontSizeRaw, {
		coerceTo: 'rem',
	} );

	const fluidTargetFontSize = `${ minimumFontSizeRem?.value || '14px' }${
		minimumFontSizeRem?.unit || 'rem'
	} + ((1vw - ${ viewportWidthOffset }) * ${ linearFactorScaled })`;

	return `clamp(${ minimumFontSizeRaw }, ${ fluidTargetFontSize }, ${ maximumFontSizeRaw })`;
}

export default getComputedFluidTypographyValue;
