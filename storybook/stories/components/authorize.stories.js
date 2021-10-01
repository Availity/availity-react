import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Alert } from 'reactstrap';

import { useAuthorize } from '@availity/authorize';
import README from '@availity/authorize/README.md';
import '@availity/mock';

import { Preview } from '../util';

const Authorize = React.lazy(() => import('@availity/authorize'));

const queryClient = new QueryClient();

const Component = () => {
  const { authorized, isLoading } = useAuthorize(text('Permissions', '1234') || object('Permissions Array', []), {
    organizationId: text('Organization ID', '1111'),
    customerId: text('Customer ID', ''),
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  const auth = text('Authorized Content', 'You are authorized to see this content.');
  const unAuth = text('Unauthorized Content', 'You are not authorized to see this content.');

  return <Alert color={authorized ? 'success' : 'danger'}>{authorized ? auth : unAuth}</Alert>;
};

storiesOf('Components/Authorize', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>
      <p>
        For this demo, the following permissions are returned: 1234, 2345, 3456, 4567, 5678, 6789. You can use the knobs
        to see what the component will do when you set the required permissions to various things.
      </p>
      <hr />
      <QueryClientProvider client={queryClient}>
        <Authorize
          permissions={text('Permissions', '1234') || object('Permissions Array', [])}
          organizationId={text('Organization ID', '1111')}
          customerId={text('Customer ID', '')}
          negate={boolean('Negate', false)}
          loader={boolean('Loader', true)}
          unauthorized={
            <Alert color="danger">{text('Unauthorized Content', 'You are not authorized to see this content.')}</Alert>
          }
        >
          <Alert color="success">{text('Authorized Content', 'You are authorized to see this content.')}</Alert>
        </Authorize>
      </QueryClientProvider>
    </div>
  ))
  .add('useAuthorize', () => (
    <div>
      <p>
        For this demo, the following permissions are returned: 1234, 2345, 3456, 4567, 5678, 6789. You can use the knobs
        to see what the component will do when you set the required permissions to various things.
      </p>
      <hr />
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    </div>
  ));
