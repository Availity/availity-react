import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ArgsTable } from '@storybook/addon-docs';
import Link from '..';

export default {
  title: 'Components/Link',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const WithAbsoluteUrl: Story = () => (
  <div className="py-3">
    <Link href="https://github.com/Availity" target="_blank">
      Availity Github
    </Link>
  </div>
);
WithAbsoluteUrl.storyName = 'with absolute url';

export const WithRelativeUrl: Story = () => (
  <div className="py-3">
    <Link href="/public/apps/my-app" target="_blank">
      My Application
    </Link>
  </div>
);
WithRelativeUrl.storyName = 'with relative url';

export const Props: Story = () => (
  <>
    <h4>Availity Props</h4>
    <h5>Link Props</h5>
    <ArgsTable of={Link} />
  </>
);
