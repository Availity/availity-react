import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Alert } from 'reactstrap';
import BlockUi from 'react-block-ui';
import { QueryClientProvider, QueryClient } from 'react-query';

import Authorize, { useAuthorize } from '.';
// import README from '../README.md';

export default {
  title: 'Components/Authorize',
  parameters: {
    docs: {
      // page: README,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  args: {
    permissions: ['1234'],
    organizationId: '1111',
    unauthorized: 'You are not authorized to see this content.',
    authorized: 'You are authorized to see this content.',
    region: true,
  },
} as Meta;

export const Default: Story = ({ authorized, loader, negate, organizationId, permissions, region, unauthorized }) => (
  <div>
    <p>
      For this demo, the following permissions are granted: 1234, 2345, 3456, 4567, 5678, 6789. You can use the knobs to
      see what the component will do when you set the required permissions to various things.
    </p>
    <hr />
    <Authorize
      permissions={permissions}
      organizationId={organizationId}
      negate={negate}
      loader={loader}
      unauthorized={<Alert color="danger">{unauthorized}</Alert>}
      region={region}
    >
      <Alert color="success">{authorized}</Alert>
    </Authorize>
  </div>
);
Default.args = {
  negate: false,
  loader: true,
};
Default.storyName = 'default';

export const UseAuthorize: Story = ({ authorized, organizationId, permissions, region, unauthorized }) => {
  const { authorized: isAuthorized, isLoading } = useAuthorize(permissions, { organizationId, region });

  return (
    <div>
      <p>
        For this demo, the following permissions are granted: 1234, 2345, 3456, 4567, 5678, 6789. You can use the knobs
        to see what the component will do when you set the required permissions to various things.
      </p>
      <hr />
      <BlockUi blocking={isLoading} renderChildren={false}>
        {isAuthorized ? <Alert color="success">{authorized}</Alert> : <Alert color="danger">{unauthorized}</Alert>}
      </BlockUi>
    </div>
  );
};
UseAuthorize.storyName = 'useAuthorize';
