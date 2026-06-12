import { defineConfig } from 'tsup';
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';

export default defineConfig({
  entry: ['src/index.js'],
  format: ['esm'],
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
