import React from 'react';
import { Meta } from '@storybook/react-vite';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { useOrganizations } from '../src';
// import README from '../README.md';

import ResourceComponent from './ResourceComponent';

export default {
  title: 'Hooks/useOrganizations',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'Hook that returns organizations.',
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
  const { data, isLoading } = useOrganizations({});

  return <ResourceComponent title="Organizations" data={data} loading={isLoading} />;
};

export const Default = { render: () => <ResourceExample />, name: 'default' };
