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
        'Components',
        'Hooks',
        'Deprecated',
        '3rd Party',
      ],
    },
  },
  viewMode: 'docs',
};

// Make sure we are in the browser before starting
if (typeof global.process === 'undefined') {
  const { worker } = await import('../packages/mock/src/browser.ts');

  const config =
    import.meta.env.MODE === 'development'
      ? undefined
      : {
          serviceWorker: { url: '/availity-react/storybook/mockServiceWorker.js' },
        };

  worker.start(config);
}

export const tags = ['autodocs'];
