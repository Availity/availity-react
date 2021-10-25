import React from 'react';
import { Meta, Story } from '@storybook/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { usePermissions } from '@availity/hooks';
// import README from '@availity/hooks/README.md';

import '@availity/mock';
import ResourceComponent from '../util/ResourceComponent';

const queryClient = new QueryClient();

export default {
  title: 'Hooks/usePermissions',
  parameters: {
    docs: {
      // sidebar: README,
    },
  },
} as Meta;

export const Default: Story = () => {
  const SomeComponent = () => {
    const { data, isLoading } = usePermissions();
    return <ResourceComponent title="Permissions" data={data} loading={isLoading} />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SomeComponent />
    </QueryClientProvider>
  );
};
Default.storyName = 'default';
