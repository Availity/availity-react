import React from 'react';
import { StoryObj } from '@storybook/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import mockFavorites from '../../mock/src/data/settings.json';

import { FavoritesProvider } from './context';
import { FavoriteHeart } from './FavoriteHeart';
// import README from '../README.md';

export default {
  title: 'Components/Favorites',
  component: FavoriteHeart,
};

type StoryFavorites = {
  name: string;
  id: string;
};
const storyFavorites: StoryFavorites[] = mockFavorites.settings[0].favorites.map((favorite, index) => ({
  id: favorite.id,
  name: favorite.id === 'a-retired-app' ? 'A retired app' : `App #${index}`,
}));

storyFavorites.push({ id: 'another-retired-app', name: 'Another retired app' });

export const _FavoritesHeart: StoryObj = {
  render: () => (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
            },
          },
        })
      }
    >
      <FavoritesProvider>
        {storyFavorites.map((fav) => (
          <div style={{ display: 'flex', gap: '1rem' }} key={fav.id}>
            <FavoriteHeart id={fav.id} name={fav.name} disabled={fav.name.includes('retired')} />
            <div>{fav.name}</div>
          </div>
        ))}
      </FavoritesProvider>
    </QueryClientProvider>
  ),
};
