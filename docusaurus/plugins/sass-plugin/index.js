module.exports = () => {
  return {
    name: 'sass-plugin',
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.(scss|sass)$/,
              use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
              test: /font\.(otf|ttf|woff2?|eot|svg)(\?.+)?$/,
              use: ['file-loader?name=fonts/[name].[ext]'],
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              use: ['url-loader?name=images/[name].[ext]&limit=10000'],
            },
          ],
        },
      };
    },
  };
};
