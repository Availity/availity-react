import React from 'react';
import { Meta } from '@storybook/react-vite';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { useCurrentRegion } from '../src';
// import README from '../README.md';

import ResourceComponent from './ResourceComponent';

export default {
  title: 'Hooks/useCurrentRegion',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: "Hook that returns the user's current region.",
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
  const { data, isLoading } = useCurrentRegion();

  return <ResourceComponent title="Region" data={data} loading={isLoading} />;
};

export const Default = {
  render: () => <ResourceExample />,
  name: 'default',
};
