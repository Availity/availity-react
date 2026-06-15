import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

// Worker to use in the browser eg: Storybook
const worker = setupWorker(...handlers);

export { worker };
