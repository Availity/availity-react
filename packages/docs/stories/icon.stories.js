import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { select } from '@storybook/addon-knobs';
import README from '@availity/icon/README.md';
import Icon from '@availity/icon';
import icons from 'availity-uikit/fonts/config.json';

const options = {
  lg: 'lg',
  xl: 'xl',
  '2x': '2x',
  '3x': '3x',
  '4x': '4x',
  '5x': '5x',
};

const iconOptions = {};

icons.glyphs.forEach(glyph => {
  iconOptions[glyph.css] = glyph.css;
});

console.log('icon options:', iconOptions);

storiesOf('Icons|Icon', module)
  .addDecorator(withReadme([README]))
  .add('default', () => (
    <div className="py-3">
      <Icon
        name={select('Icon Name', iconOptions, 'home')}
        size={select('Sizes', options, '3x')}
      />
    </div>
  ));
