import { setupServer } from 'msw/node';

import { handlers } from './handlers';

// Server to run from terminal eg: vitest
export const server = setupServer(...handlers);
