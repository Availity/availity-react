import React from 'react';
import { Meta } from '@storybook/react-vite';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { usePermissions } from '../src';
// import README from '../README.md';

import ResourceComponent from './ResourceComponent';

export default {
  title: 'Hooks/usePermissions',
  parameters: {
    docs: {
      // sidebar: README,
      description: {
        component: 'Hook that returns user permissions.',
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
  const { data, isLoading } = usePermissions('123');

  return <ResourceComponent title="Permissions" data={data} loading={isLoading} />;
};

export const Default = { render: () => <ResourceExample />, name: 'default' };
