import React from 'react';
import { Story, Meta } from '@storybook/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import mockFavorites from '../../mock/src/data/settings.json';
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

export const Default: Story = () => (
  <QueryClientProvider client={new QueryClient()}>
    <FavoritesProvider>
      {favorites.map((fav, index) => (
        <div style={{ display: 'flex', gap: '1rem' }} key={fav.id}>
          <FavoriteHeart id={fav.id} name={`App #${index}`} />
          <div>{`App #${index}`}</div>
        </div>
      ))}
    </FavoritesProvider>
  </QueryClientProvider>
);

Default.storyName = 'default';
