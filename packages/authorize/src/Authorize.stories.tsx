/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from 'reactstrap';
import BlockUi from '@availity/block-ui';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Authorize, { useAuthorize } from '.';

/** Check user permissions to see if the current user is authorized to see your content.
 *
 * This package uses [react-query](https://tanstack.com/query/v4/docs/framework/react/overview) to handle data fetching.
 * This means you must add a [QueryClientProvider](https://tanstack.com/query/v4/docs/framework/react/reference/QueryClientProvider)
 * to your app if you do not already have one.
 */
const meta: Meta<typeof Authorize> = {
  title: 'Components/Authorize',
  component: Authorize,
  decorators: [
    (Story: () => JSX.Element) => (
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  args: {
    permissions: ['1234'],
    organizationId: '1111',
    region: true,
    unauthorized: 'You are not authorized to see this content.',
    children: 'You are authorized to see this content.',
    negate: false,
    loader: true,
  },
  argTypes: {
    children: { control: 'text' },
    unauthorized: { control: 'text' },
  },
};

export default meta;

export const Component: StoryObj<typeof Authorize> = {
  render: ({ children, unauthorized, ...args }) => (
    <div>
      <p>
        For this demo, the following permissions are granted: 1234, 2345, 3456, 4567, 5678, 6789. You can use the knobs
        to see what the component will do when you set the required permissions to various things.
      </p>
      <hr />
      <Authorize unauthorized={<Alert color="danger">{unauthorized}</Alert>} {...args}>
        <Alert color="success">{children}</Alert>
      </Authorize>
    </div>
  ),
};

export const Hook: StoryObj<typeof Authorize> = {
  render: () => {
    const { authorized, isLoading } = useAuthorize(['1234'], { organizationId: '1111', region: true });

    return (
      <div>
        <p>
          For this demo, the following permissions are granted: 1234, 2345, 3456, 4567, 5678, 6789.
        </p>
        <hr />
        <BlockUi blocking={isLoading} renderChildren={false}>
          {authorized ? (
            <Alert color="success">You are authorized to see this content.</Alert>
          ) : (
            <Alert color="danger">You are not authorized to see this content.</Alert>
          )}
        </BlockUi>
      </div>
    );
  },
};
