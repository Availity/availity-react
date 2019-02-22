import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import README from '@availity/icon/README.md';
import Icon from '@availity/icon';

storiesOf('Icons|Icon', module)
  .addDecorator(withReadme([README]))
  .add('default', () => (
    <div className="py-3">
      <Icon name="home" />
      <Icon name="home" size="lg" />
      <Icon name="home" size="xl" />
      <Icon name="home" size="2x" />
      <Icon name="home" size="3x" />
      <Icon name="home" size="4x" />
      <Icon name="home" size="5x" />
    </div>
  ));
