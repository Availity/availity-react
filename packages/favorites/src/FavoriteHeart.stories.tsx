import React from 'react';
import { Story, Meta } from '@storybook/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import mockFavorites from '../../mock/src/data/settings.json';

import { FavoritesProvider } from './context';
import { FavoriteHeart } from './FavoriteHeart';
// import README from '../README.md';

export default {
  title: 'Components/Favorites',
  parameters: {
    docs: {
      // page: README,
    },
  },
} as Meta;

type StoryFavorites = {
  name: string;
  id: string;
};
const storyFavorites: StoryFavorites[] = mockFavorites.settings[0].favorites.map((favorite, index) => ({
  id: favorite.id,
  name: favorite.id === 'a-retired-app' ? 'A retired app' : `App #${index}`,
}));

storyFavorites.push({ id: 'another-retired-app', name: 'Another retired app' });

export const Default: Story = () => (
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
);

Default.storyName = 'default';
