import React from 'react';
import { Meta, Story } from '@storybook/react';

import PayerLogo from '..';
// import README from '../README.md';

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
    <p>Note: this is not a real logo. It is a sample image.</p>
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
    <p>Note: this is not a real logo. It is a sample image.</p>
  </div>
);
WithSpaceId.args = {
  spaceId: 'space1',
  clientId: 'my-client-id',
};
WithSpaceId.storyName = 'with space ID';
