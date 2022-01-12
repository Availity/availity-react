import React from 'react';
import { Story, Meta } from '@storybook/react';

import Avatar from './Avatar';
// import README from '../README.md';

export default {
  title: 'Components/Avatar',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ fallback, skeletonWidth, skeletonHeight }) => (
  <Avatar
    fallback={fallback}
    skeletonProps={{
      width: skeletonWidth,
      height: skeletonHeight,
    }}
  />
);

Default.args = {
  fallback: '/public/apps/my-profile/images/Avatars-00.png',
  skeletonHeight: '350px',
  skeletonWidth: '350px',
};

Default.storyName = 'default';
