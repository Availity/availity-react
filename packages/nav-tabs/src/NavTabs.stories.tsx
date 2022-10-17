import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Tabs } from '.';

import '../styles.scss';

export default {
  title: 'Components/Nav-Tabs',
  parameters: {
    docs: {
      // page: README,
    },
  },
  args: {
    tabAray: ['Tab 1', 'Tab 2'],
  },
} as Meta;

export const NavTabs: Story = ({ tabArray }) => <Tabs tabArray={tabArray} />;
NavTabs.storyName = 'Nav Tabs';
