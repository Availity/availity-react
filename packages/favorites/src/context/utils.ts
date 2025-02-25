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

const submit = async ({ favorites, targetFavoriteId }: MutationVariables, applicationId: string): Promise<MutationVariables> => {
  const response: SettingsResponse = await avSettingsApi.setApplication(applicationId, { favorites });
  return { favorites: response.data.favorites, targetFavoriteId };
};

const getFavorites = async (applicationId: string) => {
  const result = await avSettingsApi.getApplication(applicationId);
  const unvalidatedFavorites = result?.data?.settings?.[0]?.favorites;
  const validatedFavorites = validateFavorites(unvalidatedFavorites);

  return validatedFavorites;
};

export const useFavoritesQuery = (applicationId: string): UseQueryResult<Favorite[], unknown> => useQuery(['favorites'], () => getFavorites(applicationId));

type MutationOptions = {
  onMutationStart?: (targetFavoriteId: string) => void;
};

// I'll give you a dollar if you can type this return type for me 💵
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSubmitFavorites = ({ onMutationStart }: MutationOptions, applicationId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync: submitFavorites, ...rest } = useMutation(({ favorites, targetFavoriteId }: MutationVariables) => submit({ favorites, targetFavoriteId }, applicationId), {
    onMutate(variables: MutationVariables) {
      onMutationStart?.(variables.targetFavoriteId);
    },
    onSuccess(data: SettingsResponse) {
      queryClient.setQueryData(['favorites'], data.favorites);
    },
  });
  return { submitFavorites, ...rest };
};

export const sendUpdateMessage = (favorites: Favorite[], applicationId: string): void => {
  if (applicationId === NAV_APP_ID) {
    avMessages.send({
      favorites,
      event: AV_INTERNAL_GLOBALS.FAVORITES_UPDATE,
    });
  }
};

export const openMaxModal = (applicationId: string): void | null => {
  if (applicationId === NAV_APP_ID) {
    return avMessages.send(AV_INTERNAL_GLOBALS.MAX_FAVORITES);
  }
  return null;
}
