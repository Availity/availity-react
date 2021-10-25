import { themes } from '@storybook/theming';
import '@storybook/addon-console';
import mock from 'xhr-mock';
import './config.scss';

mock.setup();

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
