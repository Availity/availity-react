import React from 'react';
import { Story, Meta } from '@storybook/react';
import AppTiles from './AppTiles';

export default {
  title: 'Components/AppTiles',
  parameters: {
    docs: {},
  },
} as Meta;

const colors = ['black', 'blue', 'orange', 'green', 'red'];

export const Default: Story = ({ alt, image, branded, shortName, parents, color, size }) => (
  <AppTiles
    size={size}
    color={color}
    branded={branded}
    image={image}
    shortName={shortName}
    parents={parents}
    alt={alt}
  />
);

Default.args = {
  size: 'lg',
  color: colors[0],
  alt: '',
  image: '',
  shortName: 'SN',
  parents: [
    {
      images: {
        tile: '/public/apps/tiles/images/availity_tile_1.jpeg',
      },
    },
    {
      shortName: 'AB',
    },
    {
      images: {
        tile: '/public/apps/tiles/images/availity_tile_2.jpeg',
      },
    },
    {
      shortName: 'CD',
    },
    {
      images: {
        tile: '/public/apps/tiles/images/availity_tile_3.jpeg',
      },
    },
    {
      shortName: 'EF',
    },
    {
      images: {
        tile: '/public/apps/tiles/images/availity_tile_1.jpeg',
      },
    },
    {
      shortName: 'GH',
    },
  ],
};

Default.argTypes = {
  size: {
    type: 'select',
    options: ['sm', 'lg', 'xl'],
  },
  color: {
    type: 'select',
    options: colors,
  },
};

Default.storyName = 'default';
