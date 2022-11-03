import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Tabs } from '.';

const StarWars = () => {
  return (
    <>
      <h1>💫</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </>
  );
};

const StarTrek = () => {
  return (
    <>
      <h1>🌌</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </>
  );
};

const Battlestar = () => {
  return (
    <>
      <h1>🛸</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.∂
      </p>
    </>
  );
};

export default {
  title: 'Components/Nav-Tabs',
  parameters: {
    docs: {
      // page: README,
    },
  },
  args: {
    tabArray: [
      {
        label: 'Star Wars',
        default: true,
        component: <StarWars />,
      },
      {
        label: 'Star Trek',
        default: false,
        component: <StarTrek />,
      },
      {
        label: 'Battlestar Galatica',
        default: false,
        component: <Battlestar />,
      },
    ],
  },
} as Meta;

export const NavTabs: Story = ({ tabArray }) => <Tabs tabArray={tabArray} />;
NavTabs.storyName = 'Nav Tabs';
