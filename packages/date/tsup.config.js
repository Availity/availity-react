const { defineConfig } = require('tsup');
const { sassPlugin, postcssModules } = require('esbuild-sass-plugin');

module.exports = defineConfig({
  entry: ['src/index.js'],
  format: ['esm', 'cjs'],
  esbuildPlugins: [
    sassPlugin({
      transform: postcssModules({
        extract: false,
        modules: {
          generateScopedName: '[hash:base64:12]',
        },
      }),
    }),
  ],
  external: ['~@availity/react-dates/lib/css/_datepicker.css'],
});
