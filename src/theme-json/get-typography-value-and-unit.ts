import { empty, isNumeric } from '../utils';

type FontSizeUnits = 'px' | 'rem' | 'em' | '';
interface Options {
	coerceTo?: FontSizeUnits;
	rootSizeValue?: number;
	acceptableUnits?: FontSizeUnits[];
}

// The JS version of the core `wp_get_typography_value_and_unit` function.
function getTypographyValueAndUnit(
	rawValue: any,
	options?: Options
): { value: number; unit: FontSizeUnits } | null {
	if ( typeof rawValue !== 'string' && typeof rawValue !== 'number' ) {
		return null;
	}

	if ( empty( rawValue ) ) {
		return null;
	}

	if ( isNumeric( rawValue ) ) {
		rawValue = `${ rawValue }px`;
	}

	const defaults: Options = {
		coerceTo: '',
		rootSizeValue: 16,
		acceptableUnits: [ 'rem', 'px', 'em' ],
	};

	const opts = {
		...defaults,
		...options,
	} as Required< Options >;

	const acceptableUnitGroups = opts.acceptableUnits.join( '|' );
	const pattern = new RegExp(
		`^(\\d*\\.?\\d+)(${ acceptableUnitGroups }){1,1}$`
	);

	const matches = rawValue.toString().match( pattern );

	// We need a number value and a px or rem unit.
	if ( ! matches || matches.length < 3 || ! matches[ 1 ] || ! matches[ 2 ] ) {
		return null;
	}

	let value = parseFloat( matches[ 1 ] );
	let unit = matches[ 2 ];

	// Default browser font size. Later we could inject some JS to compute this `getComputedStyle( document.querySelector( "html" ) ).fontSize`.
	if ( 'px' === opts.coerceTo && ( 'em' === unit || 'rem' === unit ) ) {
		value = value * opts.rootSizeValue;
		unit = opts.coerceTo;
	}

	if (
		'px' === unit &&
		( 'em' === opts.coerceTo || 'rem' === opts.coerceTo )
	) {
		value = value / opts.rootSizeValue;
		unit = opts.coerceTo;
	}

	/*
	 * No calculation is required if swapping between em and rem yet,
	 * since we assume a root size value. Later we might like to differentiate between
	 * :root font size (rem) and parent element font size (em) relativity.
	 */
	if (
		( 'em' === opts.coerceTo || 'rem' === opts.coerceTo ) &&
		( 'em' === unit || 'rem' === unit )
	) {
		unit = opts.coerceTo;
	}

	return {
		value: parseFloat( value.toFixed( 3 ) ),
		unit,
	};
}

export default getTypographyValueAndUnit;
