import React from 'react';
import { Story, Meta } from '@storybook/react';

import Avatar, { SkeletonType } from '../src/Avatar';
import { ArgsTable } from '@storybook/addon-docs';
import { Img, ImgProps } from 'react-image';
import Skeleton from 'react-loading-skeleton';
// import README from '../README.md';

export default {
  title: 'Components/Avatar',
  parameters: {
    docs: {
      // page: README,
      description: {
        component: 'Availity user avatar component.',
      },
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

export const hidden_RSImg = (props: ImgProps) => <Img {...props} />;
export const hidden_RSSkeleton = (props: SkeletonType) => <Skeleton {...props} />;
export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Avatar</h5>
    <ArgsTable of={Avatar} />

    <h4>React Image Props</h4>
    <h5>Img</h5>
    <div>Additional props on Avatar spread to this component</div>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSImg} />
    </div>

    <h4>React Loading Skeleton</h4>
    <h5>Skeleton</h5>
    <div>Additional props on Img spread to this component</div>
    <div></div>
    <div className="argstable-remove-default">
      <ArgsTable of={hidden_RSSkeleton} />
    </div>
  </>
);
