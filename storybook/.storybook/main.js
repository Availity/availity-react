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
    'storybook-readme',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
};
