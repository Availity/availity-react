'use strict';

const { runTransformTest } = require('codemod-cli');

runTransformTest({
  name: 'block-ui-import',
  path: require.resolve('./index.js'),
  fixtureDir: `${__dirname}/__testfixtures__/`,
});
