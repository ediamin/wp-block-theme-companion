function classAggregator(): Thenable< string[] > {
	return new Promise( ( resolve ) => {
		resolve( [ 'has-black-background-color', 'has-white-background-color' ] );
	} );
}

export default classAggregator;
