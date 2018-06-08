import '@storybook/addon-options/register';
import 'storybook-readme/register';

// Order is important for addons. The order determines which addon shows first in the tab group. We want
// the readme addon to show first.
import '@storybook/addon-knobs/register';
import '@storybook/addon-a11y/register';
import '@storybook/addon-storysource/register';
