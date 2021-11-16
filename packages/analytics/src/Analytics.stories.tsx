/* eslint-disable no-console */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button } from 'reactstrap';

import Analytics from './Analytics';
// import README from '../README.md';

export default {
  title: 'Components/Analytics',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

const plugins = [
  {
    isEnabled: () => true,
    init: () => {
      console.log('init');
    },
    trackEvent: (event: unknown) => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(event));
    },
    trackPageView: () => {
      console.log('track page view');
    },
  },
];

export const Default: Story = () => (
  <Analytics plugins={plugins}>
    <Button
      id="buttonId"
      data-av-analytics-on="click"
      data-av-analytics-action="click"
      data-av-analytics-test-id="hello"
    >
      Click Me
    </Button>
  </Analytics>
);
Default.storyName = 'default';
