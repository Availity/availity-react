/* eslint-disable global-require */
module.exports = () => {
  return {
    name: 'mock-plugin',
    async contentLoaded() {
      require('@availity/mock');
    },
  };
};
