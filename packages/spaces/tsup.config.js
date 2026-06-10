import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.js'],
  format: ['esm'],
  dts: true,
  loader: { '.scss': 'empty' },
});
