/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { StoryObj } from '@storybook/react';
import { Alert } from 'reactstrap';
import BlockUi from '@availity/block-ui';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { useAuthorize, UseAuthorizeProps } from '.';

// exporting as a component allows for args generation
export const UseAuthorizeComponent = (args: UseAuthorizeProps) => <div>{JSON.stringify(args)}</div>;

/** Hook for determining authorization based on a list of permissions with optional parameters.
 *
 * This package uses [react-query](https://tanstack.com/query/v4/docs/framework/react/overview) to handle data fetching.
 * This means you must add a [QueryClientProvider](https://tanstack.com/query/v4/docs/framework/react/reference/QueryClientProvider)
 * to your app if you do not already have one.
 *
 * The default setup should cover most use-cases. However, there are 2 query options we recommend looking into
 * in order to determine what is correct for your app. These settings are `refetchOnWindowFocus` and
 * `staleTime`. The first option sets whether the to refetch the query when the window is focused, and
 * the other is the default marker for how long the query is valid.
 */
export default {
  title: 'Components/Authorize/useAuthorize',
  decorators: [
    (Story: () => JSX.Element) => (
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  args: {
    permissions: ['1234'],
    parameters: {
      organizationId: '1111',
      region: true,
    },
    queryOptions: {
      refetchOnWindowFocus: false,
    },
  },
  argTypes: {
    queryOptions: {
      name: 'options',
    },
  },
  component: UseAuthorizeComponent,
  excludeStories: /.*Component$/,
};

export const _UseAuthorize: StoryObj<typeof UseAuthorizeComponent> = {
  render: ({ permissions, parameters, queryOptions }: UseAuthorizeProps) => (
    <pre>{JSON.stringify(useAuthorize(permissions, parameters, queryOptions), null, 2)}</pre>
  ),
};

export const _BlockUIExample: StoryObj<typeof UseAuthorizeComponent> = {
  render: ({ permissions, parameters, queryOptions }: UseAuthorizeProps) => {
    const { authorized, isLoading } = useAuthorize(permissions, parameters, queryOptions);

    return (
      <div>
        <p>
          For this demo, the following permissions are granted: 1234, 2345, 3456, 4567, 5678, 6789. You can use the
          knobs to see what the component will do when you set the required permissions to various things.
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
