// TypeScript counterpart of the function `_wp_to_kebab_case`.
function kebabCase( inputString: any ): string {
	/** Used to compose unicode character classes. */
	const rsAstralRange = '\\ud800-\\udfff';
	const rsDingbatRange = '\\u2700-\\u27bf';
	const rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff';
	const rsMathOpRange = '\\xac\\xb1\\xd7\\xf7';
	const rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf';
	const rsPunctuationRange = '\\u2000-\\u206f';
	const rsSpaceRange =
		' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000';
	const rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde';
	const rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

	/** Used to compose unicode capture groups. */
	// const rsAstral = '[' + rsAstralRange + ']';
	const rsBreak = '[' + rsBreakRange + ']';
	const rsDigits = '\\d+';
	const rsLower = '[' + rsLowerRange + ']';
	const rsMisc =
		'[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']';
	const rsUpper = '[' + rsUpperRange + ']';

	/** Used to compose unicode regexes. */
	const rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')';
	const rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')';
	const rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])';
	const rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])';

	const regexp = new RegExp(
		'(' +
			rsUpper +
			'?' +
			rsLower +
			'+)(?=' +
			rsBreak +
			'|' +
			rsUpper +
			'|$)|' +
			'(' +
			rsMiscUpper +
			'+)(?=' +
			rsBreak +
			'|' +
			rsUpper +
			rsMiscLower +
			'|$)|' +
			'(' +
			rsUpper +
			'?' +
			rsMiscLower +
			'+)|' +
			'(' +
			rsUpper +
			'+)|' +
			'(' +
			rsOrdUpper +
			')|' +
			'(' +
			rsOrdLower +
			')|' +
			'(' +
			rsDigits +
			')',
		'gu'
	);

	const matches = String( inputString ).replace( /'/g, '' ).match( regexp );
	return matches ? matches.map( ( match: string ) => match.toLowerCase() ).join( '-' ) : '';
}

export default kebabCase;
