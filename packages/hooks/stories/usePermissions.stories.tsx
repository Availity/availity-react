import React from 'react';
import { Meta, Story } from '@storybook/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { usePermissions } from '..';
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

export const Default: Story = () => {
  const { data, isLoading } = usePermissions();

  return <ResourceComponent title="Permissions" data={data} loading={isLoading} />;
};
Default.storyName = 'default';
