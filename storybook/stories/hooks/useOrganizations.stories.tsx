import React from 'react';
import { Meta, Story } from '@storybook/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { useOrganizations } from '@availity/hooks';
// import README from '@availity/hooks/README.md';

import '@availity/mock';
import ResourceComponent from '../util/ResourceComponent';

const queryClient = new QueryClient();

export default {
  title: 'Hooks/useOrganizations',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = () => {
  const SomeComponent = () => {
    const { data, isLoading } = useOrganizations();
    return <ResourceComponent title="Organizations" data={data} loading={isLoading} />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SomeComponent />
    </QueryClientProvider>
  );
};
Default.storyName = 'default';
