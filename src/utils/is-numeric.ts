function isNumeric( value: any ): boolean {
	// Use the unary plus (+) operator to convert the value to a number.
	// If the value is NaN (Not-a-Number), it's not numeric.
	return ! isNaN( parseFloat( value ) ) && isFinite( value );
}

export default isNumeric;
