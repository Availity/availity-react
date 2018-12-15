import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { checkA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import mock from 'xhr-mock';
import './config.scss';

mock.setup();

addDecorator(
  withOptions({
    name: 'availity-react',
    url: 'https://github.com/availity/availity-react',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
    selectedAddonPanel: undefined,
    sortStoriesByKind: true,
  })
);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
addDecorator(checkA11y);
addDecorator(withKnobs);

configure(loadStories, module);
