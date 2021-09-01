import React from 'react';
import { storiesOf } from '@storybook/react';

import README from '@availity/link/README.md';
import Link from '@availity/link';

import { Preview } from '../util';

storiesOf('Components/Link', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  })
  .add('with absolute url', () => (
    <div className="py-3">
      <Link href="https://github.com/Availity" target="_blank">
        Availity Github
      </Link>
    </div>
  ))
  .add('with relative url', () => (
    <div className="py-3">
      <Link href="/public/apps/my-app" target="_blank">
        My Application
      </Link>
    </div>
  ));
