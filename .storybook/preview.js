/* eslint-disable import/prefer-default-export */
import './config.scss';

export const parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
  options: {
    storySort: {
      order: [
        'Home',
        'Hooks',
        'Components',
        'Form Components',
        ['Form', 'Date', 'Phone', 'Select', 'Upload'],
        'Legacy Form Components',
        'Deprecated',
      ],
    },
  },
  viewMode: 'docs',
};

// Make sure we are in the browser before starting
if (typeof global.process === 'undefined') {
  const { worker } = require('../packages/mock/src/browser');

  const config =
    process.env.NODE_ENV === 'development'
      ? undefined
      : {
          serviceWorker: { url: '/availity-react/storybook/mockServiceWorker.js' },
        };

  worker.start(config);
}
