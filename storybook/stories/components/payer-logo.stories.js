import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import PayerLogo from '@availity/payer-logo';
import README from '@availity/payer-logo/README.md';
import '@availity/mock';

import { Preview } from '../util';

storiesOf('Components/Payer Logo', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('with payer ID', () => (
    <div>
      <PayerLogo
        payerId={text('Payer ID', 'PayerID')}
        clientId={text('Client ID', 'my-client-id')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on Availity
        Portal
      </p>
    </div>
  ))
  .add('with space ID', () => (
    <div>
      <PayerLogo
        spaceId={text('Payer Space ID', '73162546201441126239486200007187')}
        clientId={text('Client ID', 'my-client-id')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on the Availity
        Portal
      </p>
    </div>
  ));
