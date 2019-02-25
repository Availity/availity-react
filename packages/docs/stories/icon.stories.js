import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { select, text } from '@storybook/addon-knobs';
import README from '@availity/icon/README.md';
import Icon from '@availity/icon';

const label = 'Sizes';
const options = {
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
};
const defaultValue = 1;

storiesOf('Icons|Icon', module)
  .addDecorator(withReadme([README]))
  .add('default', () => (
    <div className="py-3">
      <Icon
        name={text('Icon Name', 'home')}
        size={select(label, options, defaultValue)}
      />
    </div>
  ));
