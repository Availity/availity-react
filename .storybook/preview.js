/* eslint-disable import/prefer-default-export */
import { themes } from '@storybook/theming';

import './config.scss';

export const parameters = {
  docs: {
    theme: themes.dark,
  },
  options: {
    name: 'availity-react',
    url: 'https://github.com/availity/availity-react',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
  },
};

// Make sure we are in the browser before starting
if (typeof global.process === 'undefined') {
  const { worker } = require('../packages/mock/src');

  const config =
    process.env.NODE_ENV === 'development'
      ? undefined
      : {
          serviceWorker: { url: '/availity-react/storybook/mockServiceWorker.js' },
        };

  worker.start(config);
}
