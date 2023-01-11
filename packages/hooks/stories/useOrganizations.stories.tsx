import React from 'react';
import { Meta, Story } from '@storybook/react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { useOrganizations } from '..';
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

export const Default: Story = () => {
  const { data, isLoading } = useOrganizations();

  return <ResourceComponent title="Organizations" data={data} loading={isLoading} />;
};
Default.storyName = 'default';
