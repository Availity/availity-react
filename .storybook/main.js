import { createRequire } from "node:module";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);
const config = {
  stories: [
    './*.stories.tsx',
    './stories/*.stories.tsx',
    '../packages/**/*.stories.tsx',
  ],

  addons: [getAbsolutePath("@storybook/addon-a11y"), getAbsolutePath("@storybook/addon-docs")],
  staticDirs: ['../static', './static'],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {
      builder: {
        viteConfigPath: undefined,
      },
    },
  },

  viteFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      conditions: ['source', ...(config.resolve?.conditions || [])],
    };
    config.css = {
      ...config.css,
      modules: {
        localsConvention: 'camelCase',
      },
    };
    return config;
  }
};

export default config;

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
