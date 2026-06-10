import React from 'react';
import { Meta } from '@storybook/react-vite';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { useCurrentUser } from '../src';
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

const ResourceExample = () => {
  const { data, isLoading } = useCurrentUser();

  return <ResourceComponent title="User" data={data} loading={isLoading} />;
};

export const Default = {
  render: () => <ResourceExample />,
  name: 'default',
};
