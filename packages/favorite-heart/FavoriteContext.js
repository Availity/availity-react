import { createContext, useContext } from 'react';
import { useToggle } from '@availity/hooks';
import avMessages from '@availity/message-core';
import { AvSplunkAnalytics } from '@availity/analytics-core';
import get from 'lodash.get';
import isUndefined from 'lodash.isundefined';
import isNumber from 'lodash.isnumber';
import sortBy from 'lodash.sortby';
import reduce from 'lodash.reduce';
import clone from 'lodash.clone';
import max from 'lodash.max';
import findwhere from 'lodash.findwhere';
import { avSettingsApi, AvLogMessages } from '@availity/api-axios';

const MAX_FAVORITES = 60;
const NAV_APP_ID = 'Gateway-AvNavigation';

const AV_INTERNAL_GLOBALS = {
  FAVORITES_UPDATE: 'av:favorites:update',
  FAVORITES_CHANGED: 'av:favorites:changed',
  MAX_FAVORITES: 'av:favorites:maxed',
  MY_TOP_APPS_UPDATED: 'av:topApps:updated',
};

export class Favorites {
  constructor() {
    this.getFavorites();
  }

  favorites = [];

  avSplunkAnalytics = new AvSplunkAnalytics(AvLogMessages, true);

  getFavorites = async () => {
    const result = await avSettingsApi.getApplication(NAV_APP_ID);

    this.favorites = get(result, 'data.settings[0].favorites');
  };

  deleteFavorite = async id => {
    const result = await this.submitFavorites(
      clone(this.favorites).filter(favorite => favorite.id !== id)
    );
    this.favorites = get(result, 'data.favorites');

    this.sendUpdate();

    return !!findwhere(this.favorites, { id });
  };

  sendUpdate = () => {
    const message = {
      favorites: this.favorites,
    };

    avMessages.send({
      message,
      event: AV_INTERNAL_GLOBALS.FAVORITES_UPDATE,
    });
  };

  openMaxModal = () => {
    const atMaxLog = {
      category: 'favorites',
      label: 'max-favorites-modal',
      event: 'modal-open',
    };

    this.avSplunkAnalytics.trackEvent(atMaxLog);

    avMessages.send(AV_INTERNAL_GLOBALS.MAX_FAVORITES);
  };

  addFavorite = async id => {
    if (this.maxedOut()) {
      this.openMaxModal();
      return false;
    }

    const maxFavorite = max(this.favorites, favorite => favorite.pos);
    const newData = clone(this.favorites);

    newData.push({
      id,
      pos: maxFavorite ? maxFavorite.pos + 1 : 0,
    });

    const result = await this.submitFavorites(newData);

    this.favorites = get(result, 'data.favorites');

    const isFavorited = findwhere(this.favorites, { id });

    return !!isFavorited;
  };

  validatedFavorites = input => {
    const validFavorites = reduce(
      input,
      (result, favorite) => {
        if (
          !isUndefined(favorite.id) &&
          !isUndefined(favorite.pos) &&
          isNumber(favorite.pos)
        ) {
          result.push(favorite);
        }
        return result;
      },
      []
    );
    sortBy(validFavorites, 'pos').forEach((favorite, index) => {
      favorite.pos = index;
    });

    return validFavorites;
  };

  submitFavorites = async newfavorites => {
    const favorites = this.validatedFavorites(newfavorites);

    return avSettingsApi.setApplication(NAV_APP_ID, {
      favorites,
    });
  };

  maxedOut() {
    return this.favorites.length >= MAX_FAVORITES;
  }
}

const FavoritesContext = createContext(new Favorites());

export const useFavorites = id => {
  const { favorites, deleteFavorite, addFavorite } = useContext(
    FavoritesContext
  );

  const [isFavorited, toggleFavorited] = useToggle(
    !!findwhere(favorites, { id })
  );

  const toggleFavorite = async () =>
    toggleFavorited(
      isFavorited ? await deleteFavorite(id) : await addFavorite(id)
    );

  return [isFavorited, toggleFavorite];
};
export default FavoritesContext;
