import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import PayerLogo, { PayerTile, PayerBillboard } from '@availity/payer-image';
import README from '@availity/payer-image/README.md';

storiesOf('Images|Payer', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .addDecorator(withKnobs)
  .add('PayerLogo with payer ID', () => (
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
  .add('PayerLogo with space ID', () => (
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
  ))
  .add('PayerTile with payer ID', () => (
    <div>
      <PayerTile
        payerId={text('Payer ID', 'PayerID')}
        clientId={text('Client ID', 'my-client-id')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on Availity
        Portal
      </p>
    </div>
  ))
  .add('PayerTile with space ID', () => (
    <div>
      <PayerTile
        spaceId={text('Payer Space ID', '73162546201441126239486200007187')}
        clientId={text('Client ID', 'my-client-id')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on the Availity
        Portal
      </p>
    </div>
  ))
  .add('PayerBillboard with payer ID', () => (
    <div>
      <PayerBillboard
        payerId={text('Payer ID', 'PayerID')}
        clientId={text('Client ID', 'my-client-id')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on Availity
        Portal
      </p>
    </div>
  ))
  .add('PayerBillboard with space ID', () => (
    <div>
      <PayerBillboard
        spaceId={text('Payer Space ID', '73162546201441126239486200007187')}
        clientId={text('Client ID', 'my-client-id')}
      />
      <p>
        Note: the logo uses a relative URL which will only work on the Availity
        Portal
      </p>
    </div>
  ));
