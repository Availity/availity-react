import 'regenerator-runtime/runtime';
import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import 'availity-uikit';
import './config.scss';

setOptions({
  name: 'availity-react',
  url: 'https://github.com/availity/availity-react',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
});

// automatically import all story js files that end with *.stories.js
const req = require.context('../stories/', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
