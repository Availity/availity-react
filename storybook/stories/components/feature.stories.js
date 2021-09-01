import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';

import Feature from '@availity/feature';
import README from '@availity/feature/README.md';
import '@availity/mock';

import { Preview } from '../util';

storiesOf('Components/Feature', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>
      <p>
        For this demo, the following features are <b>disabled</b>: AV-1234,
        AV-2345, AV-3456, AV-4567, AV-5678, AV-6789 (
        <b>All other features are enabled</b>). You can use the knobs to see
        what the component will do when you set the features to various things.
      </p>
      <hr />
      <Feature
        features={text('Features', 'AV-1234') || object('Features Array', [])}
        negate={boolean('Negate', false)}
        loader={boolean('Loader', true)}
        whenDisabled={text(
          'Disabled Feature Content',
          'This feature is disabled.'
        )}
      >
        {text(
          'Feature Content',
          'This is the cool new feature. Lucky you, you get to see it.'
        )}
      </Feature>
    </div>
  ));
