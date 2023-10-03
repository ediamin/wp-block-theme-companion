import { SettingsProperties } from '../types';

// `WP_Theme_JSON::set_spacing_sizes()` counterpart.
function setCoreSpacingSizes(
	coreSettings: SettingsProperties,
	settings: SettingsProperties
): SettingsProperties {
	const spacingScale = {
		...( coreSettings?.spacing?.spacingScale || {} ),
		...( settings?.spacing?.spacingScale || {} ),
	};

	if (
		! spacingScale.steps ||
		isNaN( spacingScale.steps ) ||
		! spacingScale.mediumStep ||
		isNaN( spacingScale.mediumStep ) ||
		! spacingScale.increment ||
		isNaN( spacingScale.increment ) ||
		! spacingScale.unit ||
		! spacingScale.operator ||
		( spacingScale.operator !== '+' && spacingScale.operator !== '*' )
	) {
		return coreSettings;
	}

	if ( spacingScale.steps === 0 ) {
		return coreSettings;
	}

	const unit = spacingScale.unit === '%' ? '%' : spacingScale.unit.toLowerCase();
	let currentStep = spacingScale.mediumStep;
	const stepsMidPoint = Math.round( spacingScale.steps / 2 );
	let xSmallCount: number | null = null;
	const belowSizes: { name: string; slug: string; size: string }[] = [];
	let slug = 40;
	let remainder = 0;

	for (
		let belowMidpointCount = stepsMidPoint - 1;
		spacingScale.steps > 1 && slug > 0 && belowMidpointCount > 0;
		belowMidpointCount--
	) {
		if ( spacingScale.operator === '+' ) {
			currentStep -= spacingScale.increment;
		} else if ( spacingScale.increment > 1 ) {
			currentStep /= spacingScale.increment;
		} else {
			currentStep *= spacingScale.increment;
		}

		if ( currentStep <= 0 ) {
			remainder = belowMidpointCount;
			break;
		}

		belowSizes.push( {
			name: belowMidpointCount === stepsMidPoint - 1 ? 'Small' : `${ xSmallCount }X-Small`,
			slug: slug.toString(),
			size: `${ parseFloat( currentStep.toFixed( 2 ) ) }${ unit }`,
		} );

		if ( belowMidpointCount === stepsMidPoint - 2 ) {
			xSmallCount = 2;
		}

		if ( belowMidpointCount < stepsMidPoint - 2 ) {
			xSmallCount = xSmallCount ? xSmallCount + 1 : 1;
		}

		slug -= 10;
	}

	belowSizes.reverse();

	belowSizes.push( {
		name: 'Medium',
		slug: '50',
		size: `${ spacingScale.mediumStep }${ unit }`,
	} );

	currentStep = spacingScale.mediumStep;
	let xLargeCount: number | null = null;
	const aboveSizes: { name: string; slug: string; size: string }[] = [];
	slug = 60;
	const stepsAbove = spacingScale.steps - stepsMidPoint + remainder;

	for ( let aboveMidpointCount = 0; aboveMidpointCount < stepsAbove; aboveMidpointCount++ ) {
		currentStep =
			// eslint-disable-next-line no-nested-ternary
			spacingScale.operator === '+'
				? currentStep + spacingScale.increment
				: spacingScale.increment >= 1
				? currentStep * spacingScale.increment
				: currentStep / spacingScale.increment;

		aboveSizes.push( {
			name: aboveMidpointCount === 0 ? 'Large' : `${ xLargeCount }X-Large`,
			slug: slug.toString(),
			size: `${ parseFloat( currentStep.toFixed( 2 ) ) }${ unit }`,
		} );

		if ( aboveMidpointCount === 1 ) {
			xLargeCount = 2;
		}

		if ( aboveMidpointCount > 1 ) {
			xLargeCount = xLargeCount ? xLargeCount + 1 : 1;
		}

		slug += 10;
	}

	const spacingSizes = [ ...belowSizes, ...aboveSizes ];

	if ( spacingScale.steps <= 7 ) {
		for ( let spacingSizesCount = 0; spacingSizesCount < spacingSizes.length; spacingSizesCount++ ) {
			spacingSizes[ spacingSizesCount ].name = ( spacingSizesCount + 1 ).toString();
		}
	}

	coreSettings = {
		...coreSettings,
		spacing: {
			...( coreSettings.spacing || {} ),
			spacingSizes,
		},
	};

	return coreSettings;
}

export default setCoreSpacingSizes;
