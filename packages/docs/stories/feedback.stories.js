import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import {
  withKnobs,
  text,
  boolean,
  selectV2,
} from '@storybook/addon-knobs/react';

import Feedback, { FeedbackForm } from '@availity/feedback';
import README from '@availity/feedback/README.md';

storiesOf('Actions|Feedback', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('default', () => (
    <Feedback
      appName={text('Application Name', 'Payer Space')}
      prompt={text('Prompt')}
      color={selectV2(
        'Button Color',
        {
          light: 'light',
          dark: 'dark',
          ghost: 'ghost',
          primary: 'primary',
          secondary: 'secondary',
          success: 'success',
          danger: 'danger',
          info: 'info',
          warning: 'warning',
        },
        Feedback.defaultProps.color
      )}
      outline={boolean('Button Outline', false)}
      className={text('ClassName', Feedback.defaultProps.className)}
    >
      {text('Button Text')}
    </Feedback>
  ))
  .add('with form', () => (
    <FeedbackForm
      name={text('Application Name', 'Payer Space')}
      prompt={text('Prompt')}
    />
  ));
