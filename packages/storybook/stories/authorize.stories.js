import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react';

import Authorize, { useAuthorize } from '@availity/authorize';
import README from '@availity/authorize/README.md';
import '@availity/mock';

storiesOf('Components|Authorize', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>
      <p>
        For this demo, the following permissions are granted: 1234, 2345, 3456,
        4567, 5678, 6789. You can use the knobs to see what the component will
        do when you set the required permissions to various things.
      </p>
      <hr />
      <Authorize
        permissions={
          text('Permissions', '1234') || object('Permissions Array', [])
        }
        organizationId={text('OrganizationId', '1111')}
        negate={boolean('Negate', false)}
        loader={boolean('Loader', true)}
        unauthorized={text(
          'Unauthorized Content',
          'You are not authorized to see this content.'
        )}
      >
        {text('Authorized Content', 'You are authorized to see this content.')}
      </Authorize>
    </div>
  ))
  .add('useAuthorize', () => {
    const Component = () => {
      const [authorized] = useAuthorize(
        text('Permissions', '1234') || object('Permissions Array', []),
        {
          organizationId: text('OrganizationId', '1111'),
        }
      );

      return authorized
        ? text('Authorized Content', 'You are authorized to see this content.')
        : text(
            'UnAuthorized Content',
            'You are not authorized to see this content.'
          );
    };

    return (
      <div>
        <p>
          For this demo, the following permissions are granted: 1234, 2345,
          3456, 4567, 5678, 6789. You can use the knobs to see what the
          component will do when you set the required permissions to various
          things.
        </p>
        <hr />
        <Component />
      </div>
    );
  });
