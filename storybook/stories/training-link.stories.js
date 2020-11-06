import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import TrainingLink from '@availity/training-link';
import README from '@availity/training-link/README.md';

storiesOf('Components|Training Link', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => (
    <TrainingLink link={text('Link', 'https://google.com')} name="Appeals" />
  ));
