import React from 'react';
import { Meta, Story } from '@storybook/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { useProviders } from '@availity/hooks';
// import README from '@availity/hooks/README.md';
import '@availity/mock';

import ResourceComponent from '../util/ResourceComponent';

const queryClient = new QueryClient();

export default {
  title: 'Hooks/useProviders',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = () => {
  const SomeComponent = () => {
    const { data, isLoading } = useProviders({
      customerId: 123,
    });
    return <ResourceComponent title="Providers" data={data} loading={isLoading} />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SomeComponent />
    </QueryClientProvider>
  );
};
Default.storyName = 'default';
