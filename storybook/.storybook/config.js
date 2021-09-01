import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addReadme } from 'storybook-readme';
import mock from 'xhr-mock';
import './config.scss';

mock.setup();

addParameters({
  options: {
    theme: {
      brandTitle: 'availity-react',
      brandUrl: 'https://github.com/availity/availity-react',
    },
    isFullscreen: false,
    showPanel: true,
    showNav: true,
    showSearchBox: false,
    sortStoriesByKind: true,
    panelPosition: 'right',
    selectedAddonPanel: undefined,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
  },
});

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}
addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(addReadme);

configure(loadStories, module);
