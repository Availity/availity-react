const path = require('path');

module.exports = {
  stories: ['../packages/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  staticDirs: ['../static'],
  webpackFinal: async (config) => {
    config.module.rules.push(
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]],
        },
        include: new RegExp(`node_modules[/\\\\](?=(@availity)).*`),
      }
    );

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
