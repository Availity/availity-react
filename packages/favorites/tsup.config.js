import { defineConfig } from 'tsup';
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
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
