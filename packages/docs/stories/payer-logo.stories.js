import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import PayerLogo from '@availity/payer-logo';
import README from '@availity/payer-logo/README.md';

storiesOf('Logos|Payer', module)
  .addDecorator(withReadme([README]))
  .addDecorator(withKnobs)
  .add('with payer ID', () => (
    <div>
      <PayerLogo payerId={text('Payer ID', 'PayerID')} />
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
      />
      <p>
        Note: the logo uses a relative URL which will only work on the Availity
        Portal
      </p>
    </div>
  ));
