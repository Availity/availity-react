import React, { ReactNode, createContext, useEffect, useMemo, useContext, useState } from 'react';
import avMessages from '@availity/message-core';
import { useQueryClient } from 'react-query';
import { AppContext, Favorite, StatusUnion } from './types';
import { AV_INTERNAL_GLOBALS, MAX_FAVORITES } from './constants';
import { openMaxModal, sendUpdateMessage, useSubmitFavorites, useFavoritesQuery } from './utils';

const asyncNoOp = () => Promise.resolve();

const FavoritesContext = createContext<AppContext | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [activeMutationId, setActiveMutationId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: favorites, status } = useFavoritesQuery();

  const { submitFavorites, isLoading } = useSubmitFavorites({
    onMutate({ activeMutationId }) {
      setActiveMutationId(activeMutationId);
    },
    onSettled() {
      setActiveMutationId(null);
    },
  });

  useEffect(() => {
    avMessages.subscribe(AV_INTERNAL_GLOBALS.FAVORITES_CHANGED, (messagesData) => {
      queryClient.setQueryData('favorites', messagesData.favorites || []);
    });

    return () => avMessages.unsubscribe(AV_INTERNAL_GLOBALS.FAVORITES_CHANGED);
  }, [queryClient]);

  const deleteFavorite = async (id: string) => {
    if (favorites) {
      const response = await submitFavorites({
        favorites: favorites.filter((favorite: Favorite) => favorite.id !== id),
        activeMutationId: id,
      });

      sendUpdateMessage(response.favorites);
    }
  };

  const addFavorite = async (id: string) => {
    if (!favorites) return false;

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

    setActiveMutationId(id);

    const newFavPos = maxFavorite ? maxFavorite.pos + 1 : 0;
    const response = await submitFavorites({
      favorites: [...favorites, { id, pos: newFavPos }],
      activeMutationId: id,
    });

    sendUpdateMessage(response.favorites);

    const isFavorited = response.favorites.find((f) => f.id === id);

    return !!isFavorited;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        status,
        isLoading,
        activeMutationId,
        deleteFavorite,
        addFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (
  id: string
): {
  isFavorited: boolean;
  status: StatusUnion;
  isDisabled: boolean;
  isActiveMutation: boolean;
  toggleFavorite: () => Promise<void>;
  allFavorites?: Favorite[];
} => {
  const context = useContext(FavoritesContext);

  if (context === null) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  const { favorites, status, activeMutationId, deleteFavorite, addFavorite } = context;

  const isActiveMutation = activeMutationId === id;

  const isFavorited = useMemo(() => {
    const fav = favorites?.find((f) => f.id === id);
    return !!fav;
  }, [favorites, id]);

  const toggleFavorite = async () => (isFavorited ? deleteFavorite(id) : addFavorite(id));

  const isDisabled = status === 'loading' || status === 'idle' || activeMutationId !== null;

  return {
    isFavorited,
    status,
    // try to put spinner on the button that was clicked, and subtly disable the other buttons
    isDisabled,
    isActiveMutation,
    toggleFavorite: isDisabled ? asyncNoOp : toggleFavorite,
    allFavorites: favorites,
  };
};
