import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import README from '@availity/avatar/README.md';

import { Preview } from '../util';

const Avatar = React.lazy(() => import('@availity/avatar'));

export default {
  title: 'Components/Avatar',
  decorators: [withKnobs],

  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  },
};

export const Default = () => (
  <div className="py-3">
    <Avatar
      fallback={text('Fallback', '/public/apps/my-profile/images/Avatars-00.png')}
      skeletonProps={{
        width: text('Skeleton Width', '350px'),
        height: text('Skeleton Height', '350px'),
      }}
    />
  </div>
);

Default.story = {
  name: 'default',
};
