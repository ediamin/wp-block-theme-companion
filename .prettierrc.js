const defaultConfig = require( '@wordpress/prettier-config' );

/** @type {PrettierConfig & WPPrettierOptions} */
const config = {
	...defaultConfig,
	printWidth: 110,
};

module.exports = config;
