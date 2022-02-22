import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import mockFavorites from '../../mock/src/data/settings.json';
// import { Card, CardTitle } from 'reactstrap';
import '@availity/favorites/style.scss';

import { FavoritesProvider } from '../src/FavoritesContext';
import { FavoriteHeart } from '../src/FavoriteHeart';
// import README from '../README.md';

const { favorites } = mockFavorites.settings[0];

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

export const Default: Story = () => {
  const setCount = useState(0)[1];
  const forcRerender = () => setCount((prev) => prev + 1);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <FavoritesProvider>
        {favorites.map((fav, index) => (
          <div style={{ display: 'flex', gap: '1rem' }} key={fav.id}>
            <FavoriteHeart id={fav.id} name={`My favorite #${index}`} />
            <div>{`My favorite #${index}`}</div>
          </div>
        ))}
        <Spacer />
        <button type="button" onClick={forcRerender}>
          Force re-render
        </button>
      </FavoritesProvider>
    </QueryClientProvider>
  );
};
Default.storyName = 'default';
