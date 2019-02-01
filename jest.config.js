module.exports = {
  setupFilesAfterEnv: [
    // This should be working however when we remove the
    // afterEach cleanup from Upload.test.js it fails to clean up properly.
    'react-testing-library/cleanup-after-each',
  ],
  collectCoverageFrom: ['packages/**/*.{js,jsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/'],
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!@availity).+\\.(js|jsx)$',
  ],
  transform: {
    '^.+\\.(js|jsx)$': `${require.resolve('./jest/babel.js')}`,
    '^.+\\.css$': `${require.resolve('./jest/css.js')}`,
    '^(?!.*\\.(js|jsx|css|json)$)': `${require.resolve('./jest/file.js')}`,
  },
};
