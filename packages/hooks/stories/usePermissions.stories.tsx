import React from 'react';
import { Meta, Story } from '@storybook/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { usePermissions } from '@availity/hooks';
// import README from '@availity/hooks/README.md';

import '@availity/mock';
import ResourceComponent from './ResourceComponent';

const queryClient = new QueryClient();

export default {
  title: 'Hooks/usePermissions',
  parameters: {
    docs: {
      // sidebar: README,
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
  const { data, isLoading } = usePermissions();

  return <ResourceComponent title="Permissions" data={data} loading={isLoading} />;
};
Default.storyName = 'default';
