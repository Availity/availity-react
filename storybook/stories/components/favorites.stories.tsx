import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Card, CardTitle } from 'reactstrap';
import '@availity/favorites/style.scss';
import Favorites, { FavoriteHeart } from '@availity/favorites';
// import README from '@availity/favorites/README.md';

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
