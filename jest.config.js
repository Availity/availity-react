module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.js'],
  collectCoverageFrom: ['packages/**/*.{js,jsx}'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/docs',
    '/storybook',
    '/packages/mock/',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/dist/',
    '/packages/mock/',
    '/storybook/',
    '/docs/',
    '/packages/feature/bin.js',
  ],
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!@availity).+\\.(js|jsx)$',
  ],
  transform: {
    '^.+\\.(js|jsx)$': `${require.resolve('./jest/babel.js')}`,
    '^.+\\.css$': `${require.resolve('./jest/css.js')}`,
    '^(?!.*\\.(js|jsx|css|json)$)': `${require.resolve('./jest/file.js')}`,
  },
  roots: ['packages/'],
};
