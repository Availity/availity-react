// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/jest/cssTransform.js

module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCacheKey() {
    // The output is always the same.
    return 'cssTransform';
  },
};
