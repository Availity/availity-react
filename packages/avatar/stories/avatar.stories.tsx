import React from 'react';
import { StoryObj } from '@storybook/react';
import { Img, ImgProps } from 'react-image';
import Skeleton from 'react-loading-skeleton';

import Avatar, { SkeletonType } from '../src/Avatar';
// import README from '../README.md';

export default {
  title: 'Components/Avatar',
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

export const hidden_RSImg = (props: ImgProps) => <Img {...props} />;
export const hidden_RSSkeleton = (props: SkeletonType) => <Skeleton {...props} />;
