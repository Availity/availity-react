/* eslint-disable import/prefer-default-export */
import { setupWorker, rest } from 'msw';

import { handlers } from './handlers';

// Export the worker instance, so we can await the activation on Storybook's runtime.
// You can use this reference to start the worker for local development as well.
const worker = setupWorker(...handlers);

export { worker, rest };
