import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import '@availity/mock';

import Feedback, { FeedbackForm } from '@availity/feedback';
import README from '@availity/feedback/README.md';

import { Preview } from '../util';

storiesOf('Components/Feedback', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => (
    <Feedback
      appName={text('Application Name', 'Payer Space')}
      prompt={text('Prompt')}
      formProps={{
        additionalComments: boolean('Additional Comments', false),
        aboutOptions: boolean('About Options', false)
          ? [
              { label: 'The Payer Space', value: 'space' },
              { label: 'Applications', value: 'applications' },
              { label: 'Resources', value: 'resources' },
              { label: 'News and Announcements', value: 'news' },
            ]
          : [],
        staticFields: { staticKey: 'my-static-value' },
      }}
      color={select(
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
      modal={boolean('Modal', false)}
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
