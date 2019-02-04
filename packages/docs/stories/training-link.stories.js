import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs/react';

import TrainingLink from '@availity/training-link';
import README from '@availity/training-link/README.md';
import { text } from '@storybook/addon-knobs';

storiesOf('Actions|Training Link', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('default', () => (
    <TrainingLink link={text('Link', 'https://google.com')} name="Appeals" />
  ));
