import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Alert } from 'reactstrap';
import BlockUi from 'react-block-ui';
import { QueryClientProvider, QueryClient } from 'react-query';

import Authorize, { useAuthorize } from '.';
import { ArgsTable } from '@storybook/addon-docs';
// import README from '../README.md';

export default {
  title: 'Components/Authorize',
  parameters: {
    docs: {
      // page: README,
      description: {
        component:
          "Component for showing content based on the user's permissions. Wrap this component around content you only want specific users to see.\n\nThis package uses react-query to handle data fetching. This means you must add a QueryClientProvider to your app if you do not already have one. The default setup should cover most use-cases. However, there are 2 options we recommend looking into in order to determine what is correct for your app. These settings are refetchOnWindowFocus and staleTime. The first option sets whether the to refetch the query when the window is focused, and the other is the default marker for how long the query is valid. ",
      },
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

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Authorize</h5>
    <ArgsTable of={Authorize} />

    {/*<h4>Reactstrap Props</h4>*/}
    {/*<h5>Badge</h5>*/}
    {/*<div>Additional props on RemovableBadge spread to this component</div>*/}
    {/*<div className="argstable-remove-default">*/}
    {/*  <ArgsTable of={hidden_RSBadge} />*/}
    {/*</div>*/}
  </>
);
