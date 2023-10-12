import avMessages from '@availity/message-core';
import { avSettingsApi } from '@availity/api-axios';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { AV_INTERNAL_GLOBALS, NAV_APP_ID } from './constants';

export type Favorite = {
  id: string;
  pos: number;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
export const isFavorite = (arg: any): arg is Favorite =>
  Boolean(typeof arg?.id === 'string' && typeof arg?.pos === 'number');

/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
export const validateFavorites = (unvalidatedFavorites: any): Favorite[] => {
  const validatedFavorites = Array.isArray(unvalidatedFavorites) ? unvalidatedFavorites?.filter(isFavorite) : [];
  return validatedFavorites;
};

type MutationVariables = {
  favorites: Favorite[];
  targetFavoriteId: string;
};

type SettingsResponse = { data: { favorites: Favorite[] } };

const submit = async ({ favorites, targetFavoriteId }: MutationVariables): Promise<MutationVariables> => {
  const response: SettingsResponse = await avSettingsApi.setApplication(NAV_APP_ID, { favorites });
  return { favorites: response.data.favorites, targetFavoriteId };
};

const getFavorites = async () => {
  const result = await avSettingsApi.getApplication(NAV_APP_ID);
  const unvalidatedFavorites = result?.data?.settings?.[0]?.favorites;
  const validatedFavorites = validateFavorites(unvalidatedFavorites);

  return validatedFavorites;
};

export const useFavoritesQuery = (): UseQueryResult<Favorite[], unknown> => useQuery('favorites', getFavorites);

type MutationOptions = {
  onMutationStart?: (targetFavoriteId: string) => void;
};

// I'll give you a dollar if you can type this return type for me 💵
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSubmitFavorites = ({ onMutationStart }: MutationOptions) => {
  const queryClient = useQueryClient();
  const { mutateAsync: submitFavorites, ...rest } = useMutation(submit, {
    onMutate(variables) {
      onMutationStart?.(variables.targetFavoriteId);
    },
    onSuccess(data) {
      queryClient.setQueryData('favorites', data.favorites);
    },
  });
  return { submitFavorites, ...rest };
};

export const sendUpdateMessage = (favorites: Favorite[]): void => {
  avMessages.send({
    favorites,
    event: AV_INTERNAL_GLOBALS.FAVORITES_UPDATE,
  });
};

export const openMaxModal = (): void => avMessages.send(AV_INTERNAL_GLOBALS.MAX_FAVORITES);
