const global = require('../../jest/global-config');

module.exports = {
  ...global,
  displayName: 'upload',
  coverageDirectory: '../../coverage/upload',
};

// module.exports = {
//   setupFiles: ['raf/polyfill'],
//   setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

//   collectCoverageFrom: ['src/**/*.{js,jsx,tsx}'],
//   coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '.stories.tsx'],

//   transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!@availity).+\\.(js|jsx)$'],
//   transform: {
//     '^.+\\.(js|ts|jsx|tsx)$': `${require.resolve('../../jest/babel.js')}`,
//     '^.+\\.css$': `${require.resolve('../../jest/css.js')}`,
//     '^(?!.*\\.(js|jsx|css|json)$)': `${require.resolve('../../jest/file.js')}`,
//   },

//   moduleNameMapper: {
//     '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
//     '@availity/mock/src/(.*)': '<rootDir>/packages/mock/src/$1',
//   },

//   // roots: ['packages/'],

//   testEnvironment: 'jest-environment-jsdom-global',
//   testURL: 'http://localhost/',

//   globals: {
//     jsdom: true,
//   },
//   globalSetup: '../../jest/global-setup.js',
// };
