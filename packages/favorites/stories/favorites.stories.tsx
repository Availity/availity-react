import React from 'react';
import { Story, Meta } from '@storybook/react';
// import { Card, CardTitle } from 'reactstrap';
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

// export const Default: Story = () => (
//   <Favorites>
//     <Card body className="d-flex flex-row">
//       <FavoriteHeart id="1234" name="Hello World" />
//       <CardTitle className="ml-2">Hello World</CardTitle>
//     </Card>
//   </Favorites>
// );

function Spacer({ height = '1rem', width = '1rem' }: { height?: string; width?: string }) {
  return <div style={{ height, width }} />;
}

export const Default: Story = () => (
  <Favorites>
    <FavoriteHeart id="1234" name="Hello World" />
    <Spacer />
    <button type="button">test</button>
  </Favorites>
);
Default.storyName = 'default';
