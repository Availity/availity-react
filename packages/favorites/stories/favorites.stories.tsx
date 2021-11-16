import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Card, CardTitle } from 'reactstrap';

import Favorites, { FavoriteHeart } from '..';
import '../style.scss';
// import README from '../README.md';

import '@availity/mock';

export default {
  title: 'Components/Favorites',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

export const Default: Story = () => (
  <Favorites>
    <Card body className="d-flex flex-row">
      <FavoriteHeart id="1234" name="Hello World" />
      <CardTitle className="ml-2">Hello World</CardTitle>
    </Card>
  </Favorites>
);
Default.storyName = 'default';
