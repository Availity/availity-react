import { defineConfig } from 'tsup';
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  esbuildPlugins: [
    sassPlugin({
      type: 'style',
      transform: postcssModules({
        modules: {
          generateScopedName: '[hash:base64:12]',
        },
      }),
    }),
  ],
});
