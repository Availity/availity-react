import React from 'react';
import { Meta, Story } from '@storybook/react';
import PayerLogo from '@availity/payer-logo';
// import README from '@availity/payer-logo/README.md';

import '@availity/mock';

export default {
  title: 'Components/Payer Logo',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const WithPayerId: Story = ({ payerId, clientId }) => (
  <div>
    <PayerLogo payerId={payerId} clientId={clientId} />
    <p>Note: the logo uses a relative URL which will only work on Availity Portal</p>
  </div>
);
WithPayerId.args = {
  payerId: 'PayerID',
  clientId: 'my-client-id',
};
WithPayerId.storyName = 'with payer ID';

export const WithSpaceId: Story = ({ spaceId, clientId }) => (
  <div>
    <PayerLogo spaceId={spaceId} clientId={clientId} />
    <p>Note: the logo uses a relative URL which will only work on the Availity Portal</p>
  </div>
);
WithSpaceId.args = {
  spaceId: '73162546201441126239486200007187',
  clientId: 'my-client-id',
};
WithSpaceId.storyName = 'with space ID';
