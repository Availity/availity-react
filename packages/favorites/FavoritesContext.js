import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useEffectAsync } from '@availity/hooks';
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

export const FavoritesContext = createContext();

const avSplunkAnalytics = new AvSplunkAnalytics(AvLogMessages, true);

const Favorites = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    const result = await avSettingsApi.getApplication(NAV_APP_ID);

    setFavorites(get(result, 'data.settings[0].favorites'));
  };

  useEffectAsync(async () => {
    avMessages.subscribe(
      AV_INTERNAL_GLOBALS.FAVORITES_CHANGED,
      (event, data) => {
        setFavorites(get(data, 'favorites') || []);
      }
    );

    await getFavorites();

    return () => avMessages.unsubscribe(AV_INTERNAL_GLOBALS.FAVORITES_CHANGED);
  }, []);

  const validatedFavorites = input => {
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

  const submitFavorites = async newfavorites => {
    const favorites = validatedFavorites(newfavorites);

    return avSettingsApi.setApplication(NAV_APP_ID, {
      favorites,
    });
  };

  const sendUpdate = () => {
    const message = {
      favorites,
    };

    avMessages.send({
      message,
      event: AV_INTERNAL_GLOBALS.FAVORITES_UPDATE,
    });
  };

  const deleteFavorite = async id => {
    const result = await submitFavorites(
      clone(favorites).filter(favorite => favorite.id !== id)
    );
    setFavorites(get(result, 'data.favorites'));

    sendUpdate();
  };

  const openMaxModal = () => {
    const atMaxLog = {
      category: 'favorites',
      label: 'max-favorites-modal',
      event: 'modal-open',
    };

    avSplunkAnalytics.trackEvent(atMaxLog);

    avMessages.send(AV_INTERNAL_GLOBALS.MAX_FAVORITES);
  };

  const addFavorite = async id => {
    if (favorites.length >= MAX_FAVORITES) {
      openMaxModal();
      return false;
    }

    const maxFavorite = max(favorites, favorite => favorite.pos);
    const newData = clone(favorites);

    newData.push({
      id,
      pos: maxFavorite ? maxFavorite.pos + 1 : 0,
    });

    const result = await submitFavorites(newData);

    setFavorites(get(result, 'data.favorites'));

    const isFavorited = findwhere(favorites, { id });

    return !!isFavorited;
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, deleteFavorite, addFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

Favorites.propTypes = {
  children: PropTypes.node,
};

export const useFavorites = id => {
  const { favorites, deleteFavorite, addFavorite } = useContext(
    FavoritesContext
  );

  const isFavorited = useMemo(() => !!findwhere(favorites, { id }), [
    favorites,
    id,
  ]);

  const toggleFavorite = async () =>
    isFavorited ? deleteFavorite(id) : addFavorite(id);

  return [isFavorited, toggleFavorite];
};
export default Favorites;
