import { setupServer } from 'msw/node';

import { handlers } from './handlers';

// Server to run from terminal eg: jest tests
// eslint-disable-next-line import/prefer-default-export
export const server = setupServer(...handlers);
