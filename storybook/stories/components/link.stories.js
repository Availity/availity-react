import React from 'react';
import { storiesOf } from '@storybook/react';

import README from '@availity/link/README.md';

import { Preview } from '../util';

const Link = React.lazy(() => import('@availity/link'));

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
