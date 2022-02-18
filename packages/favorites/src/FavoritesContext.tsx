import React, { ReactNode, createContext, useState, useEffect, useMemo, useContext } from 'react';
import avMessages from '@availity/message-core';
import { avSettingsApi } from '@availity/api-axios';
import { AppContext, Favorite } from './types';
import { AV_INTERNAL_GLOBALS, MAX_FAVORITES, NAV_APP_ID } from './constants';
import { openMaxModal, sendUpdate, submitFavorites, validateFavorites } from './utils';

export const FavoritesContext = createContext<AppContext | null>(null);

const Favorites = ({ children }: { children: ReactNode }): JSX.Element => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const getFavorites = async () => {
      const result = await avSettingsApi.getApplication(NAV_APP_ID);
      const unvalidatedFavorites = result?.data?.settings?.[0]?.favorites;
      const validatedFavorites = validateFavorites(unvalidatedFavorites);

      setFavorites(validatedFavorites);
    };

    getFavorites();
  }, []);

  useEffect(() => {
    avMessages.subscribe(AV_INTERNAL_GLOBALS.FAVORITES_CHANGED, (data) => {
      setFavorites(data.favorites || []);
    });

    return () => avMessages.unsubscribe(AV_INTERNAL_GLOBALS.FAVORITES_CHANGED);
  }, []);

  const deleteFavorite = async (id: string) => {
    const newFavorites = await submitFavorites(favorites.filter((favorite: Favorite) => favorite.id !== id));
    setFavorites(newFavorites);

    sendUpdate(newFavorites);
  };

  const addFavorite = async (id: string) => {
    if (favorites.length >= MAX_FAVORITES) {
      openMaxModal();
      return false;
    }

    const maxFavorite = favorites.reduce<Favorite | null>((accum, fave) => {
      if (!accum || fave.pos > accum.pos) {
        accum = fave;
      }
      return accum;
    }, null);
    const newData = [...favorites];

    newData.push({
      id,
      pos: maxFavorite ? maxFavorite.pos + 1 : 0,
    });

    const newFavorites = await submitFavorites(newData);

    setFavorites(newFavorites);

    sendUpdate(newFavorites);

    const isFavorited = newFavorites.find((f) => f.id === id);

    return !!isFavorited;
  };

  return (
    <FavoritesContext.Provider value={{ favorites, deleteFavorite, addFavorite }}>{children}</FavoritesContext.Provider>
  );
};

export const useFavorites = (id: string): [boolean, () => Promise<void>] => {
  const context = useContext(FavoritesContext);

  if (context === null) {
    throw new Error('useCount must be used within a FavoritesProvider');
  }
  const { favorites, deleteFavorite, addFavorite } = context;

  const isFavorited = useMemo(() => {
    const fav = favorites.find((f) => f.id === id);
    return !!fav;
  }, [favorites, id]);

  const toggleFavorite = async () => (isFavorited ? deleteFavorite(id) : addFavorite(id));

  return [isFavorited, toggleFavorite];
};

export default Favorites;
