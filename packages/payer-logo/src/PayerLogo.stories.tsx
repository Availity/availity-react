import React from 'react';
import { Meta } from '@storybook/react-vite';

import PayerLogo from '.';
// import README from '../README.md';

export default {
  title: 'Deprecated/Payer Logo',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: "DEPRECATED: Easy to use component to display the payer's logo given the payer's ID",
      },
    },
  },
} as Meta;

type Props = { payerId?: string; clientId: string; spaceId?: string };

export const WithPayerId = {
  render: ({ payerId, clientId }: Props) => (
    <div>
      <PayerLogo payerId={payerId} clientId={clientId} />
      <p>Note: this is not a real logo. It is a sample image.</p>
    </div>
  ),
  args: {
    payerId: 'PayerID',
    clientId: 'my-client-id',
  },
  name: 'with payer ID',
};

export const WithSpaceId = {
  render: ({ spaceId, clientId }: Props) => (
    <div>
      <PayerLogo spaceId={spaceId} clientId={clientId} />
      <p>Note: this is not a real logo. It is a sample image.</p>
    </div>
  ),
  args: {
    spaceId: 'space1',
    clientId: 'my-client-id',
  },
  name: 'with space ID',
};
