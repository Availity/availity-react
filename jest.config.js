module.exports = {
  setupFiles: ['raf/polyfill'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.js', '@testing-library/jest-dom/extend-expect'],

  testPathIgnorePatterns: ['/node_modules/', '/docs', '/packages/mock/'],

  collectCoverageFrom: ['packages/**/*.{js,jsx,tsx}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/dist/',
    '/packages/mock/',
    '/storybook/',
    '/docs/',
    '/stories/',
    '.stories.tsx',
    '/packages/feature/bin.js',
  ],

  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!@availity).+\\.(js|jsx)$'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': `${require.resolve('./jest/babel.js')}`,
    '^.+\\.css$': `${require.resolve('./jest/css.js')}`,
    '^(?!.*\\.(js|jsx|css|json)$)': `${require.resolve('./jest/file.js')}`,
  },

  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
  },

  roots: ['packages/'],

  testEnvironment: 'jest-environment-jsdom-global',
  testURL: 'http://localhost/',

  globals: {
    jsdom: true,
  },
  globalSetup: './jest/global-setup.js',
};
