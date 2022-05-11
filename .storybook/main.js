module.exports = {
  stories: ['./*.stories.mdx', '../packages/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-docs'],
  staticDirs: ['../static', './static'],
  webpackFinal: async (config) => {
    config.module.rules.push(
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
        include: /\.module\.scss$/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /\.module\.scss$/,
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          sourceType: 'unambiguous',
          presets: [['react-app', { flow: false, typescript: true }]],
        },
        include: new RegExp(`node_modules[/\\\\](?=(@availity)).*`),
      }
    );

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
