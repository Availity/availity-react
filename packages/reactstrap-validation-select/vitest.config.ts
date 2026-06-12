import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    name: 'reactstrap-validation-select',
    globals: true,
    environment: 'jsdom',
    setupFiles: ['../../vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx,js,jsx}', 'tests/**/*.test.{ts,tsx,js,jsx}'],
    env: { TZ: 'UTC' },
    server: {
      deps: {
        inline: [/lodash/, /@availity\/yup/],
      },
    },
  },
});
