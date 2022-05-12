const { defineConfig } = require('tsup');
const { sassPlugin } = require('esbuild-sass-plugin');

module.exports = defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  esbuildPlugins: [sassPlugin()],
});
