const path = require('path');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = ({ config: defaultConfig }) => {
  const jsRule = defaultConfig.module.rules[0];
  jsRule.exclude = /node_modules\/(?!(@av)).*/;
  jsRule.include = undefined;

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
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });

  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: ['awesome-typescript-loader', 'react-docgen-typescript-loader'],
    enforce: 'pre',
  });

  defaultConfig.resolve.extensions = [
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.scss',
    '.css',
  ];
  defaultConfig.resolve.alias['axios'] = path.resolve(
    path.join(__dirname, '../node_modules', 'axios')
  );
  // Return the altered config
  return defaultConfig;
};
