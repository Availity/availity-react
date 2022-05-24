const Configuration = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
  rules: {
    'header-max-length': [0, 'always', 100],
  },
};

module.exports = Configuration;
