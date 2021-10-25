const path = require('path');

module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      allowSyntheticDefaultImports: false,
      esModuleInterop: false,
    },
  },
  stories: ['../stories/**/*.stories.@(js|mdx|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.stories\.tsx?$/],
          include: [path.resolve(__dirname, '../stories')],
        },
      },
    },
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
};
