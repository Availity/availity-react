import React from 'react';
import { StoryObj } from '@storybook/react-vite';
import Avatar from '..';
// import README from '../README.md';

/**
 * # Availity user avatar component.
 */
export default {
  title: 'Deprecated/Avatar',
  component: Avatar,
};

type AvatarStoryProps = {
  fallback: string;
  skeletonHeight: string;
  skeletonWidth: string;
};

export const _Avatar: StoryObj<AvatarStoryProps> = {
  render: ({ fallback, skeletonWidth, skeletonHeight }) => (
    <Avatar
      fallback={fallback}
      skeletonProps={{
        width: skeletonWidth,
        height: skeletonHeight,
      }}
    />
  ),
  args: {
    fallback: 'public/apps/my-profile/images/Avatars-00.png',
    skeletonHeight: '350px',
    skeletonWidth: '350px',
  },
};
