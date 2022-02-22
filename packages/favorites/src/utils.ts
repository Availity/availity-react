/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import avMessages from '@availity/message-core';
import { avSettingsApi, avLogMessagesApi } from '@availity/api-axios';
import { useMutation, UseMutationOptions, useQuery, useQueryClient } from 'react-query';
import { Favorite } from './types';
import { AV_INTERNAL_GLOBALS, NAV_APP_ID } from './constants';

export const isFavorite = (arg: any): arg is Favorite =>
  Boolean(typeof arg?.id === 'string' && typeof arg?.pos === 'number');

export const validateFavorites = (unvalidatedFavorites: any) => {
  const validatedFavorites = Array.isArray(unvalidatedFavorites) ? unvalidatedFavorites?.filter(isFavorite) : [];
  return validatedFavorites;
};

type SettingsResponseType = { data: { favorites: Favorite[] } };

type MutationVarialbes = {
  favorites: Favorite[];
  activeMutationId: string;
};

const submit = ({ favorites, activeMutationId }: MutationVarialbes) =>
  avSettingsApi
    .setApplication(NAV_APP_ID, { favorites })
    .then(({ data }: SettingsResponseType) => ({ favorites: data.favorites, activeMutationId }));

const getFavorites = async () => {
  const result = await avSettingsApi.getApplication(NAV_APP_ID);
  const unvalidatedFavorites = result?.data?.settings?.[0]?.favorites;
  const validatedFavorites = validateFavorites(unvalidatedFavorites);

  return validatedFavorites;
};

export const useFavoritesQuery = () => useQuery('favorites', getFavorites);

type MutationOptions = Omit<UseMutationOptions<MutationVarialbes, unknown, MutationVarialbes, unknown>, 'mutationFn'>;

export const useSubmitFavorites = (options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const { mutateAsync: submitFavorites, ...rest } = useMutation(submit, {
    ...options,
    onMutate(...args) {
      const prevFavorites = queryClient.getQueryData('favorites');
      let optionsRecover: unknown | undefined;
      if (options?.onMutate) {
        optionsRecover = options.onMutate(...args);
      }
      return () => {
        if (typeof optionsRecover === 'function') optionsRecover();
        queryClient.setQueryData('favorites', prevFavorites);
      };
    },
    onSuccess(...args) {
      const [data] = args;
      queryClient.setQueryData('favorites', data.favorites);
      if (options?.onSuccess) options.onSuccess(...args);
    },
    onError(...args) {
      const recover = args[2];
      if (typeof recover === 'function') recover();
      if (options?.onError) options.onError(...args);
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

export const openMaxModal = (): void => {
  const atMaxLog = {
    category: 'favorites',
    label: 'max-favorites-modal',
    event: 'modal-open',
  };

  avLogMessagesApi.info(atMaxLog);

  avMessages.send(AV_INTERNAL_GLOBALS.MAX_FAVORITES);
};
