import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { useCurrentUser } from '@availity/hooks';
import README from '@availity/hooks/README.md';
import { QueryClientProvider, QueryClient } from 'react-query';
import '@availity/mock';

import { Preview, ResourceComponent } from '../util';

const queryClient = new QueryClient();

storiesOf('Hooks/useCurrentUser', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => {
    const SomeComponent = () => {
      const { data, isLoading } = useCurrentUser();

      return <ResourceComponent title="User" data={data} loading={isLoading} />;
    };

    return (
      <QueryClientProvider client={queryClient}>
        <SomeComponent />
      </QueryClientProvider>
    );
  });
