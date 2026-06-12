import React from 'react';
import { Meta } from '@storybook/react-vite';
import { useWindowDimensions } from '../src';

const ListenerComponent = () => {
  const { height, width } = useWindowDimensions();
  return (
    <div>
      {' '}
      Current Window Dimensions: height: {height}, width: {width}
    </div>
  );
};

export default {
  title: 'Hooks/useWindowDimensions',
  parameters: {
    docs: {
      description: {
        component: "Hook that returns the window's current dimensions.",
      },
    },
  },
} as Meta;

export const Default = { render: () => <ListenerComponent />, name: 'default' };
