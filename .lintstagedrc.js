module.exports = {
  '*.js': ['yarn nx affected --target=lint --fix --files', 'prettier --write'],
  '*.json': ['prettier --write'],
};
