import './config.scss';

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
