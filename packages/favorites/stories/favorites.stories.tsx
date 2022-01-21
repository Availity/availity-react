import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Card, CardTitle } from 'reactstrap';
import '@availity/favorites/style.scss';

import Favorites from '../src/FavoritesContext';
import FavoriteHeart from '../src/FavoriteHeart';
// import README from '../README.md';

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
