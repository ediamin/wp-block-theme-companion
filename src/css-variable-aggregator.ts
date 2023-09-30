import type { CssVariableAggregatorItems } from './types';

function cssVariableAggregator(
	aggregatorItems: CssVariableAggregatorItems
): Thenable< CssVariableAggregatorItems > {
	return new Promise( ( resolve ) => {
		resolve( aggregatorItems );
	} );
}

export default cssVariableAggregator;
