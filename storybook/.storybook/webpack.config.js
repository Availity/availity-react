const path = require('path');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = ({ config: defaultConfig }) => {
  const jsRule = defaultConfig.module.rules[0];
  jsRule.exclude = /node_modules\/(?!(@av)).*/;
  jsRule.include = undefined;

  defaultConfig.devtool = 'source-maps';

  // https://github.com/storybooks/storybook/issues/6204#issuecomment-478998529
  delete defaultConfig.resolve.alias['core-js'];

  defaultConfig.plugins.push(new DuplicatePackageCheckerPlugin());

  defaultConfig.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    exclude: /node_modules\/(?!(@av)).*/,
  });

  defaultConfig.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    include: path.resolve(__dirname, '../'),
  });

  defaultConfig.module.rules.push({
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: ['url-loader?name=images/[name].[ext]&limit=10000'],
  });

  defaultConfig.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource')],
    enforce: 'pre',
  });

  defaultConfig.resolve.extensions = ['.js', '.jsx', '.scss', '.css'];
  // Return the altered config
  return defaultConfig;
};
