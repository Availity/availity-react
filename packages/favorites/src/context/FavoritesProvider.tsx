import React, { ReactNode, createContext, useEffect, useMemo, useContext, useState } from 'react';
import avMessages from '@availity/message-core';
import { useQueryClient } from '@tanstack/react-query';
import { AV_INTERNAL_GLOBALS, MAX_FAVORITES, NAV_APP_ID } from './constants';
import { openMaxModal, sendUpdateMessage, useSubmitFavorites, useFavoritesQuery, Favorite } from './utils';

type StatusUnion = 'idle' | 'error' | 'loading' | 'success';

type FavoritesContextType = {
  favorites?: Favorite[];
  queryStatus: StatusUnion;
  mutationStatus: StatusUnion;
  lastClickedFavoriteId: string;
  deleteFavorite: (id: string) => void;
  addFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
  onFavoritesChange,
  applicationId = NAV_APP_ID,
  maxFavorites = MAX_FAVORITES,
}: {
  children: ReactNode;
  onFavoritesChange?: (favorites: Favorite[]) => void;
  applicationId?: string;
  maxFavorites?: number;

}): JSX.Element => {
  const [lastClickedFavoriteId, setLastClickedFavoriteId] = useState<string>('');

  const queryClient = useQueryClient();
  const { data: favorites, status: queryStatus } = useFavoritesQuery(applicationId);

  const { submitFavorites, status: mutationStatus } = useSubmitFavorites({
    onMutationStart(targetFavoriteId) {
      setLastClickedFavoriteId(targetFavoriteId);
    },
  }, applicationId);

  useEffect(() => {
    if (applicationId === NAV_APP_ID) {
      const unsubscribeFavoritesChanged = avMessages.subscribe(
        AV_INTERNAL_GLOBALS.FAVORITES_CHANGED,
        (data) => {
          if (data?.favorites) {
            queryClient.setQueryData(['favorites'], data?.favorites);
          }
        },
        { ignoreSameWindow: false }
      );

      const unsubscribeFavoritesUpdate = avMessages.subscribe(
        AV_INTERNAL_GLOBALS.FAVORITES_UPDATE,
        (data) => {
          if (data?.favorites) {
            queryClient.setQueryData(['favorites'], data?.favorites);
          }
        },
        { ignoreSameWindow: false }
      );

      return () => {
        unsubscribeFavoritesChanged();
        unsubscribeFavoritesUpdate();
      };
    }
  }, [queryClient]);

  const deleteFavorite = async (id: string) => {
    if (favorites) {
      const response = await submitFavorites({
        favorites: favorites.filter((favorite: Favorite) => favorite.id !== id),
        targetFavoriteId: id,
      });

      sendUpdateMessage(response.favorites, applicationId);
      onFavoritesChange?.(response.favorites);
    }
  };

  const addFavorite = async (id: string) => {
    if (!favorites) return false;

    if (favorites.length >= maxFavorites) {
      openMaxModal(applicationId);
      return false;
    }

    const maxFavorite = favorites.reduce<Favorite | null>((accum, fave) => {
      if (!accum || fave.pos > accum.pos) {
        accum = fave;
      }
      return accum;
    }, null);

    const newFavPos = maxFavorite ? maxFavorite.pos + 1 : 0;
    const response = await submitFavorites({
      favorites: [...favorites, { id, pos: newFavPos }],
      targetFavoriteId: id,
    });

    sendUpdateMessage(response.favorites, applicationId);
    onFavoritesChange?.(response.favorites);

    const isFavorited = response.favorites.find((f: any) => f.id === id);

    return !!isFavorited;
  };

  return (
    <FavoritesContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        favorites,
        queryStatus,
        mutationStatus,
        lastClickedFavoriteId,
        deleteFavorite,
        addFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => { };

type MergedStatusUnion = 'initLoading' | 'reloading' | 'error' | 'success';
export const useFavorites = (
  id: string
): {
  isFavorited: boolean;
  status: MergedStatusUnion;
  isLastClickedFavorite: boolean;
  toggleFavorite: () => void;
} => {
  const context = useContext(FavoritesContext);

  if (context === null) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  const { favorites, queryStatus, mutationStatus, lastClickedFavoriteId, deleteFavorite, addFavorite } = context;

  const isLastClickedFavorite = lastClickedFavoriteId === id;

  const isFavorited = useMemo(() => {
    const fav = favorites?.find((f) => f.id === id);
    return !!fav;
  }, [favorites, id]);

  const toggleFavorite = () => (isFavorited ? deleteFavorite(id) : addFavorite(id));

  const isDisabled = queryStatus === 'loading' || queryStatus === 'idle' || mutationStatus === 'loading';

  let status: MergedStatusUnion = 'initLoading';
  if (queryStatus === 'loading') status = 'initLoading';
  if (mutationStatus === 'loading') status = 'reloading';
  if (queryStatus === 'error' || mutationStatus === 'error') status = 'error';
  if (queryStatus === 'success' && (mutationStatus === 'success' || mutationStatus === 'idle')) status = 'success';

  return {
    isFavorited,
    status,
    isLastClickedFavorite,
    toggleFavorite: isDisabled ? noOp : toggleFavorite,
  };
};
