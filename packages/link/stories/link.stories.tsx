import React from 'react';
import { StoryObj } from '@storybook/react';
import Link, { AvLinkProps } from '..';

export default {
  title: 'Components/Link',
  components: Link,
};

export const _WithAbsoluteUrl: StoryObj<AvLinkProps> = {
  render: ({ href, target }) => (
    <div className="py-3">
      <Link href={href} target={target}>
        Availity Github
      </Link>
    </div>
  ),
  args: {
    href: 'https://github.com/Availity',
    target: '_blank',
  },
};

export const _WithRelativeUrl: StoryObj<AvLinkProps> = {
  render: ({ href, target }) => (
    <div className="py-3">
      <Link href={href} target={target}>
        My Application
      </Link>
    </div>
  ),
  args: {
    href: '/public/apps/my-app',
    target: '_blank',
  },
};
