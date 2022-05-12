const { defineConfig } = require('tsup');
const { sassPlugin } = require('esbuild-sass-plugin');

module.exports = defineConfig({
  entry: ['src/index.js'],
  format: ['esm', 'cjs'],
  esbuildPlugins: [sassPlugin()],
  external: ['~@availity/react-dates/lib/css/_datepicker.css'],
});
