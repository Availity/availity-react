// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/jest/babelTransform.js
const babelJest = require('babel-jest');
const { presets } = require('../babel.config');

module.exports = babelJest.createTransformer({
  presets,
  babelrc: false,
});
