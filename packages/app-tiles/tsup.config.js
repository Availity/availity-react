const { defineConfig } = require('tsup');
const { sassPlugin, postcssModules } = require('esbuild-sass-plugin');

module.exports = defineConfig({
  entry: ['src/index.ts'],
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
});
