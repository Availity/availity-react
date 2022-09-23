import qs from 'query-string';
import avMessage from '@availity/message-core';
import dayjs from 'dayjs';

export const INITIAL_STATE = {
  spaces: [],
  loading: true,
  error: null,
};

export const actions = {
  SPACES: (currentState, { spaces, spacesByConfig, spacesByPayer }) => ({
    previousSpacesMap: spaces || [],
    previousSpacesByConfigMap: spacesByConfig || [],
    previousSpacesByPayerMap: spacesByPayer || [],
    error: null,
    loading: false,
  }),
  ERROR: (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }),
  LOADING: (state, { loading }) => ({
    ...state,
    loading: loading !== undefined ? loading : !state.loading,
  }),
};

export const spacesReducer = (state, action) => actions[action.type](state, action);

// TODO: metadata deprecated in favor of metadataPairs, need to remove or refactor?
export const normalizeSpaces = (spaces) => {
  // if spaces coming in is array of an array of spaces objects,
  // then we matched by payerId and should unravel that first level of array
  let spacesToReduce = spaces;
  if (Array.isArray(spaces[0])) {
    spacesToReduce = spaces[0];
  }
  // Normalize space pairs ( [{ name: 'foo'', value: 'bar' }] => { foo: 'bar' } )
  const pairFields = ['images', 'metadata', 'colors', 'icons', 'mapping'];
  return spacesToReduce.reduce((accum, spc) => {
    if (!spc) return accum;
    for (const field of pairFields) {
      if (spc[field] && Array.isArray(spc[field])) {
        spc[field] = spc[field].reduce((_accum, { name, value }) => {
          _accum[name] = value;
          return _accum;
        }, {});
      }
    }

    accum.push(spc);
    return accum;
  }, []);
};

export const isFunction = (obj) => typeof obj === 'function';

// Examples:
//
//    - http://www.example.com?foo=bar#hashme
//    - http://www.example.com
//    - http://www.example.com?foo=bar
//
export const updateUrl = (url, key, value) => {
  const [uri, queryString] = url.split('?');
  const currentParams = qs.parse(queryString);
  const newParams = qs.stringify({
    ...currentParams,
    [key]: value,
  });

  return `${uri}?${newParams}`;
};

/**
 * Top Apps
 */

const TOP_APPS = {
  ALLOWED_TYPES: ['APPLICATION', 'RESOURCE', 'NAVIGATION'],
  BLACKLIST: ['reporting', 'how_to_guide_dental_providers', 'my_account_profile', 'my_administrators'],
  KEYS: {
    LAST_UPDATED: 'top-apps-updated',
    VALUES: 'myTopApps',
  },
  UPDATE_EVENT: 'av:topApps:updated',
};

const getItemLocalStorage = (key) => {
  try {
    const value = window.localStorage.getItem(key);
    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  } catch {
    return null;
  }
};

const canTrackSpace = (spaceId, type) =>
  TOP_APPS.ALLOWED_TYPES.some((t) => t === type) && !TOP_APPS.BLACKLIST.some((id) => id === spaceId);

const getLocalStorageTopApps = (akaname) => {
  const topAppsValues = getItemLocalStorage(`${TOP_APPS.KEYS.VALUES}-${akaname}`);

  return topAppsValues;
};

export const updateTopApps = async (space, akaname) => {
  if (!space.configurationId || !space.type) return;

  // If we can track the space
  if (canTrackSpace(space.configurationId, space.type)) {
    const today = dayjs();

    // Grab the current top apps from localstorage
    const topApps = (await getLocalStorageTopApps(akaname)) || {};

    // Update the last updated date. For use in top nav to actually sync with settings api
    window.localStorage.setItem(`${TOP_APPS.KEYS.LAST_UPDATED}-${akaname}`, today.format());

    const currentCount =
      topApps[space.configurationId] && typeof topApps[space.configurationId].count === 'number'
        ? topApps[space.configurationId].count
        : 0;

    topApps[space.configurationId] = {
      ...topApps[space.configurationId],
      count: currentCount + 1,
      lastUse: today.format(),
    };

    window.localStorage.setItem(`${TOP_APPS.KEYS.VALUES}-${akaname}`, JSON.stringify(topApps));

    avMessage.send(TOP_APPS.UPDATE_EVENT);
  }
};
