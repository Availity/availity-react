import React from 'react';
import { select } from '@storybook/addon-knobs';

import README from '@availity/icon/README.md';
import icons from 'availity-uikit/fonts/config.json';

import { Preview } from '../util';

const Icon = React.lazy(() => import('@availity/icon'));

const options = {
  lg: 'lg',
  xl: 'xl',
  '2x': '2x',
  '3x': '3x',
  '4x': '4x',
  '5x': '5x',
};

const colors = {
  none: 'none',
  primary: 'primary',
  secondary: 'secondary',
  danger: 'danger',
  warning: 'warning',
  dark: 'dark',
  white: 'white',
  light: 'light',
  success: 'success',
  info: 'info',
  muted: 'muted',
};

const iconOptions = {};

const hoverOptions = {
  cursor: 'pointer',
};

icons.glyphs.forEach((glyph) => {
  iconOptions[glyph.css] = glyph.css;
});

export default {
  title: 'Components/Icon',

  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  },
};

export const Default = () => (
  <div className="py-3">
    <Icon
      name={select('Icon Name', iconOptions, 'home')}
      size={select('Sizes', options, '3x')}
      color={select('Colors', colors)}
      style={{ cursor: select('Hover', hoverOptions, 'pointer') }}
    />
  </div>
);

Default.story = {
  name: 'default',
};
