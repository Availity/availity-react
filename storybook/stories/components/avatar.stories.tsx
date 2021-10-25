import React from 'react';
import { Story, Meta } from '@storybook/react';
import Avatar from '@availity/avatar';
// import README from '@availity/avatar/README.md';

export default {
  title: 'Components/Avatar',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = ({ fallback, skeletonWidth, skeletonHeight }) => (
  <div className="py-3">
    <Avatar
      fallback={fallback}
      skeletonProps={{
        width: skeletonWidth,
        height: skeletonHeight,
      }}
    />
  </div>
);
Default.args = {
  fallback: '/public/apps/my-profile/images/Avatars-00.png',
  skeletonHeight: '350px',
  skeletonWidth: '350px',
};
Default.storyName = 'default';
