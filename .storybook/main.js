import path from 'path';
import remarkGfm from 'remark-gfm';

function getAbsolutePath(value) {
  return path.dirname(require.resolve(path.join(value, 'package.json')));
}

const config = {
  stories: ['./*.stories.mdx', './stories/*.stories.mdx', './stories/*.stories.tsx', '../packages/**/*.stories.tsx'],

  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-a11y'),
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  staticDirs: ['../static', './static'],

  typescript: {
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules\/(?!reactstrap).*/.test(prop.parent.fileName) : true),
    },
  },

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
        include: new RegExp(`node_modules[/\\\\](?=(@availity)).*`),
      }
    );

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },

  docs: {
    autodocs: true,
  },
};

export default config;
