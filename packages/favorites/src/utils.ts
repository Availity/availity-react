/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import avMessages from '@availity/message-core';
import { avSettingsApi, avLogMessagesApi } from '@availity/api-axios';
import { Favorite } from './types';
import { AV_INTERNAL_GLOBALS, NAV_APP_ID } from './constants';

export const isFavorite = (arg: any): arg is Favorite =>
  Boolean(typeof arg?.id === 'string' && typeof arg?.pos === 'number');

export const validateFavorites = (unalidatedFavorites: any) => {
  const validatedFavorites = Array.isArray(unalidatedFavorites) ? unalidatedFavorites?.filter(isFavorite) : [];
  return validatedFavorites;
};

export const submitFavorites = async (favorites: Favorite[]) => {
  const result = await avSettingsApi.setApplication(NAV_APP_ID, {
    favorites,
  });

  return (result.data.favorites || []) as Favorite[];
};

export const sendUpdate = (favorites: Favorite[]): void => {
  avMessages.send({
    favorites,
    event: AV_INTERNAL_GLOBALS.FAVORITES_UPDATE,
  });
};

export const openMaxModal = (): void => {
  const atMaxLog = {
    category: 'favorites',
    label: 'max-favorites-modal',
    event: 'modal-open',
  };

  avLogMessagesApi.info(atMaxLog);

  avMessages.send(AV_INTERNAL_GLOBALS.MAX_FAVORITES);
};
