import React from 'react';
import { Meta, Story } from '@storybook/react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { useCurrentUser } from '..';
// import README from '../README.md';

import ResourceComponent from './ResourceComponent';

const queryClient = new QueryClient();

export default {
  title: 'Hooks/useCurrentUser',
  parameters: {
    docs: {
      // page: README,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta;

export const Default: Story = () => {
  const { data, isLoading } = useCurrentUser();

  return <ResourceComponent title="User" data={data} loading={isLoading} />;
};
Default.storyName = 'default';
