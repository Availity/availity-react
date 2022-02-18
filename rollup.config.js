import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';

const packages = ['authorize', 'icon', 'badge', 'button', 'training-link', 'table'];

// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */
export default () =>
  packages.map((pkg) => {
    const pkgPath = `packages/${pkg}`;
    // eslint-disable-next-line import/no-dynamic-require
    const pkgJson = require(`./${pkgPath}/package.json`);

    const externals = pkgJson.peerDependencies ? Object.keys(pkgJson.peerDependencies) : [];

    // eslint-disable-next-line no-console
    console.log(`externalized peer deps for ${pkg}`, externals);

    return defineConfig({
      input: `${pkgPath}/src/index.ts`,
      output: {
        file: `${pkgPath}/dist/index.js`,
        format: 'es',
        sourcemap: true,
      },
      external: externals,
      plugins: [
        resolve(),
        commonjs(),
        typescript({
          tsconfigOverride: {
            include: [`${pkgPath}/src`],
            exclude: [`${pkgPath}/src/**/*.test.tsx`, `${pkgPath}/src/**/*.test.ts`, `${pkgPath}/src/**/*.stories.tsx`],
          },
        }),
        postcss(),
      ],
    });
  });
