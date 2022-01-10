/* eslint-disable import/prefer-default-export */
import { themes } from '@storybook/theming';

import { worker } from '../packages/mock/src/browser';
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

if (worker) {
  worker.start();
}
