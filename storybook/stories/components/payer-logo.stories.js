import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import README from '@availity/payer-logo/README.md';
import '@availity/mock';

import { Preview } from '../util';

const PayerLogo = React.lazy(() => import('@availity/payer-logo'));

export default {
  title: 'Components/Payer Logo',
  decorators: [withKnobs],

  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  },
};

export const WithPayerId = () => (
  <div>
    <PayerLogo payerId={text('Payer ID', 'PayerID')} clientId={text('Client ID', 'my-client-id')} />
    <p>Note: the logo uses a relative URL which will only work on Availity Portal</p>
  </div>
);

WithPayerId.story = {
  name: 'with payer ID',
};

export const WithSpaceId = () => (
  <div>
    <PayerLogo
      spaceId={text('Payer Space ID', '73162546201441126239486200007187')}
      clientId={text('Client ID', 'my-client-id')}
    />
    <p>Note: the logo uses a relative URL which will only work on the Availity Portal</p>
  </div>
);

WithSpaceId.story = {
  name: 'with space ID',
};
