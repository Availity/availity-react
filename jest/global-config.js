const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('../tsconfig.json');

module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  globalSetup: '../../jest/global-setup.js',
  transform: {
    '^.+\\.(ts|tsx|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'tsx'],
  preset: '../../jest.preset.js',
  testEnvironment: 'jest-environment-jsdom-global',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
    jsdom: true,
  },
  coverageReporters: ['json-summary'],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../../' }),
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
