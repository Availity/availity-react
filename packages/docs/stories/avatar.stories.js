import React from 'react';
import { storiesOf } from '@storybook/react';
import README from '@availity/avatar/README.md';
import Avatar from '@availity/avatar';

storiesOf('Components|Avatar', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .add('default', () => (
    <div className="py-3">
      <Avatar />
      <div>
        <p>
          Note: Avatars images use relative urls which will only work on the
          Availity Portal
        </p>
      </div>
    </div>
  ));
