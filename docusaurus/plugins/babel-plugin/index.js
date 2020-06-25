module.exports = () => {
  return {
    name: 'sass-plugin',
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: [new RegExp(`node_modules[/\\\\](?=(@av)).*`)],
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: [[require.resolve('babel-preset-react-app')]],
                    cacheDirectory: true,
                    babelrc: false,
                    //   plugins: [babelrcExists ? null : require.resolve(settings.getHotLoaderName())]
                  },
                },
              ],
            },
          ],
        },
      };
    },
  };
};
