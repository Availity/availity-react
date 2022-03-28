module.exports = {
  setupFiles: ['raf/polyfill'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.js', '@testing-library/jest-dom/extend-expect'],

  testPathIgnorePatterns: ['/node_modules/', '/docs', '/storybook', '/packages/mock/'],

  collectCoverageFrom: ['packages/**/*.{js,jsx,tsx}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/dist/',
    '/packages/mock/',
    '/storybook/',
    '/docs/',
    '/packages/feature/bin.js',
    '.stories.tsx',
  ],

  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!@availity|react-movable).+\\.(js|jsx)$'],
  transform: {
    '^.+\\.(js|ts|jsx|tsx)$': `${require.resolve('./jest/babel.js')}`,
    '^.+\\.css$': `${require.resolve('./jest/css.js')}`,
    '^(?!.*\\.(js|jsx|css|json)$)': `${require.resolve('./jest/file.js')}`,
  },

  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
    '@availity/mock/src/(.*)': '<rootDir>/packages/mock/src/$1',
  },

  roots: ['packages/'],

  testEnvironment: 'jest-environment-jsdom-global',
  testURL: 'http://localhost/',

  globals: {
    jsdom: true,
  },
  globalSetup: './jest/global-setup.js',
};
