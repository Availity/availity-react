import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Alert } from 'reactstrap';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Authorize from '.';

/** Component for showing content based on the user's permissions. Wrap this component around content you only want specific users to see.
 *
 * The `useAuthorize` hook utilizes [react-query](https://tanstack.com/query/v4/docs/framework/react/overview) to handle data fetching.
 * This means you must add a [QueryClientProvider](https://tanstack.com/query/v4/docs/framework/react/reference/QueryClientProvider)
 * to your app if you do not already have one.
 *
 * The default setup should cover most use-cases. However, there are 2 query options we recommend looking into
 * in order to determine what is correct for your app. These settings are `refetchOnWindowFocus` and
 * `staleTime`. The first option sets whether the to refetch the query when the window is focused, and
 * the other is the default marker for how long the query is valid.
 */
const meta: Meta<typeof Authorize> = {
  title: 'Components/Authorize/Authorize',
  component: Authorize,
  decorators: [
    (Story: () => JSX.Element) => (
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  tags: ['autodocs'],
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
    children: {
      control: 'text',
    },
    unauthorized: {
      control: 'text',
    },
  },
};

export default meta;

export const _Authorize: StoryObj<typeof Authorize> = {
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
