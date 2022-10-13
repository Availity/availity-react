import React from 'react';
import { Meta, Story } from '@storybook/react';
import Tabs from './Tabs';

import '../styles.scss';

export default {
  title: 'Components/Nav-Tabs',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Tabs: Story = ({ tabArray }) => <Tabs tabArray={tabArray} />;
Tabs.args = {
  tabArray: ['Tab1'],
};
Tabs.storyName = 'Nav Tabs';
