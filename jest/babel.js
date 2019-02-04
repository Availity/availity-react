// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/jest/babelTransform.js
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        debug: false,
        modules: 'commonjs',
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  babelrc: false,
});
