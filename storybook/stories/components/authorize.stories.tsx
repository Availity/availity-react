import React from 'react';
import { Story, Meta } from '@storybook/react';
import Authorize, { useAuthorize } from '@availity/authorize';
// import README from '@availity/authorize/README.md';

import '@availity/mock';

export default {
  title: 'Components/Authorize',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ permissions, organizationId, negate, loader, unauthorized, children }) => (
  <div>
    <p>
      For this demo, the following permissions are granted: 1234, 2345, 3456, 4567, 5678, 6789. You can use the knobs to
      see what the component will do when you set the required permissions to various things.
    </p>
    <hr />
    <Authorize
      permissions={permissions}
      organizationId={organizationId}
      negate={negate}
      loader={loader}
      unauthorized={unauthorized}
    >
      {children}
    </Authorize>
  </div>
);
Default.args = {
  permissions: ['1234'],
  organizationId: '1111',
  negate: false,
  loader: true,
  unauthorized: 'You are not authorized to see this content.',
  children: 'You are authorized to see this content.',
};
Default.storyName = 'default';

export const UseAuthorize: Story = ({ permissions, organizationId, unauthorized, authorized }) => {
  const [isAuthorized] = useAuthorize(permissions, {
    organizationId,
  });

  return (
    <div>
      <p>
        For this demo, the following permissions are granted: 1234, 2345, 3456, 4567, 5678, 6789. You can use the knobs
        to see what the component will do when you set the required permissions to various things.
      </p>
      <hr />
      {isAuthorized ? authorized : unauthorized}
    </div>
  );
};
UseAuthorize.args = {
  permissions: ['1234'],
  organizationId: '1111',
  unauthorized: 'You are not authorized to see this content.',
  authorized: 'You are authorized to see this content.',
};
UseAuthorize.storyName = 'useAuthorize';
