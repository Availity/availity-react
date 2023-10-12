import React from 'react';
import { Meta, Story } from '@storybook/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { useCurrentUser } from '..';
// import README from '../README.md';

import ResourceComponent from './ResourceComponent';

export default {
  title: 'Hooks/useCurrentUser',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'Hook that returns the current user.',
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
} as Meta;

export const Default: Story = () => {
  const { data, isLoading } = useCurrentUser();

  return <ResourceComponent title="User" data={data} loading={isLoading} />;
};
Default.storyName = 'default';
