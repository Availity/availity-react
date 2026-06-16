import React from 'react';
import { Meta } from '@storybook/react-vite';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { useStash } from '../src';

import ResourceComponent from './ResourceComponent';

export default {
  title: 'Hooks/useStash',
  parameters: {
    docs: {
      description: {
        component: 'Hook that returns stash session data.',
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
  const { data, isLoading } = useStash('example-session-id');

  return <ResourceComponent title="Stash" data={data} loading={isLoading} />;
};

export const Default = {
  render: () => <ResourceExample />,
  name: 'default',
};
