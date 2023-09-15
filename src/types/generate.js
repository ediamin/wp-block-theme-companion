const path = require( 'path' );
const fs = require( 'fs' );
const { compileFromFile } = require('json-schema-to-typescript');

/**
 * 1. Changed the main "title" prop.
 * 2. Removed the `patterproperties` that contain the key `^[a-z][a-z0-9-]*\/[a-z][a-z0-9-]*$`.
 *    The last hyphen after 9 causes the problem. I cannot add an escape char in json file.
 */
async function generateTypes() {
  const filePath = path.resolve( __dirname, 'schema.json' );
  const tsContent = await compileFromFile(filePath);

  fs.writeFileSync( path.resolve( __dirname, 'types.ts' ), tsContent );
}

generateTypes();