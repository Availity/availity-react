import React from 'react';
import { StoryObj } from '@storybook/react';
import Link from '..';

export default {
  title: 'Components/Link',
  components: Link,
};

export const _WithAbsoluteUrl: StoryObj = {
  render: () => (
    <div className="py-3">
      <Link href="https://github.com/Availity" target="_blank">
        Availity Github
      </Link>
    </div>
  ),
};

export const _WithRelativeUrl: StoryObj = {
  render: () => (
    <div className="py-3">
      <Link href="/public/apps/my-app" target="_blank">
        My Application
      </Link>
    </div>
  ),
};
