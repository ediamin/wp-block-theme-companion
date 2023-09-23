const path = require( 'path' );
const fs = require( 'fs' );
const { compileFromFile } = require('json-schema-to-typescript');

/**
 * This script generate types from the theme.json schema downloaded
 * from https://schemas.wp.org/trunk/theme.json.
 *
 * Changes made in schema.json:
 * 1. Changed the main "title" property to "ThemeJson" which will be the main interface name.
 * 2. Removed the `patterproperties` that contain the key `^[a-z][a-z0-9-]*\/[a-z][a-z0-9-]*$`.
 *    The last hyphen after 9 causes the problem. I cannot add an escape char in json file.
 */
async function generateTypes() {
  const filePath = path.resolve( __dirname, 'schema.json' );
  const tsContent = await compileFromFile(filePath);

  fs.writeFileSync( path.resolve( __dirname, 'theme-json.ts' ), tsContent );
}

generateTypes();