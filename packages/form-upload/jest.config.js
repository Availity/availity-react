const global = require('../../jest/global-config');

module.exports = {
  ...global,
  displayName: 'form-upload',
  coverageDirectory: '../../coverage/form-upload',
  testRunner: 'jest-jasmine2',
};
