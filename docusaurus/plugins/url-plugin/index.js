module.exports = () => {
  return {
    name: 'url-plugin',
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              use: ['url-loader?name=images/[name].[ext]&limit=10000'],
            },
            {
              test: /font\.(otf|ttf|woff2?|eot|svg)(\?.+)?$/,
              use: ['file-loader?name=fonts/[name].[ext]'],
            },
          ],
        },
      };
    },
  };
};
