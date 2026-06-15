import browser from 'eslint-config-availity/browser';
import storybook from 'eslint-plugin-storybook';

export default [
  ...browser,
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      'import/extensions': 'off',
      'react/destructuring-assignment': 'off',
      'react/forbid-foreign-prop-types': 'off',
      'react/no-access-state-in-setstate': 'off',
      'guard-for-in': 'off',
      'no-restricted-syntax': 'off',
      'react/prefer-stateless-function': 'off',
      'unicorn/prefer-array-find': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/no-lonely-if': 'off',
      'unicorn/no-array-for-each': 'off',
      'no-restricted-exports': 'off',
      'jest/no-deprecated-functions': 'off',
      'jest/no-conditional-expect': 'off',
      'jest/no-commented-out-tests': 'off',
    },
  },
  {
    languageOptions: {
      globals: {
        vi: 'readonly',
      },
    },
  },
  {
    ignores: [
      'docs/',
      'storybook-docs/',
      'coverage/',
      'static/',
      '**/.docusaurus/',
      '**/build/',
      '**/dist/',
      '**/*.d.ts',
      '**/__snapshots__/**',
    ],
  },
  {
    files: ['docusaurus/babel.config.js', 'docusaurus/docusaurus.config.js', 'docusaurus/sidebars.js'],
    rules: {
      'unicorn/prefer-module': 'off',
    },
  },
];
