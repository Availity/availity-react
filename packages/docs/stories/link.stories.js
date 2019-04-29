import React from 'react';
import { storiesOf } from '@storybook/react';
import README from '@availity/link/README.md';
import AvLink from '@availity/link';

storiesOf('Components|Link', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      // eslint-disable-next-line react/prop-types
      StoryPreview: ({ children }) => <div>{children}</div>,
    },
  })
  .add('with absolute url', () => (
    <div className="py-3">
      <AvLink url="https://github.com/Availity" target="_blank">
        Availity Github
      </AvLink>
    </div>
  ))
  .add('with relative url', () => (
    <div className="py-3">
      <AvLink url="/public/apps/my-app" target="_blank">
        My Application
      </AvLink>
    </div>
  ));
