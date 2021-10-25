import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useCurrentRegion } from '@availity/hooks';
// import README from '@availity/hooks/README.md';
import { QueryClientProvider, QueryClient } from 'react-query';

import '@availity/mock';
import ResourceComponent from '../util/ResourceComponent';

const queryClient = new QueryClient();

export default {
  title: 'Hooks/useCurrentRegion',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = () => {
  const SomeComponent = () => {
    const { data, isLoading } = useCurrentRegion();
    return <ResourceComponent title="Region" data={data} loading={isLoading} />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SomeComponent />
    </QueryClientProvider>
  );
};
Default.storyName = 'default';
