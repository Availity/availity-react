const path = require('path');

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  storybookBaseConfig.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    include: path.resolve(__dirname, '../'),
  });

  storybookBaseConfig.module.rules.push({
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: ['url-loader?name=images/[name].[ext]&limit=10000'],
  });

  storybookBaseConfig.module.rules.push({
    test: /-font\.(otf|ttf|woff2?|eot|svg)(\?.+)?$/,
    use: ['file-loader?name=fonts/[name].[ext]&limit=10000'],
  });

  storybookBaseConfig.resolve.extensions = ['.js', '.jsx', '.scss', '.css'];

  if (configType === 'PRODUCTION') {
    // Removing uglification until we figure out a fix for that.
    storybookBaseConfig.plugins.pop();
  }

  // Return the altered config
  return storybookBaseConfig;
};
