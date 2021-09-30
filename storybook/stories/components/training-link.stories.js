import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import README from '@availity/training-link/README.md';

import { Preview } from '../util';

const TrainingLink = React.lazy(() => import('@availity/training-link'));

storiesOf('Components/Training Link', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => <TrainingLink link={text('Link', 'https://google.com')} name="Appeals" />);
