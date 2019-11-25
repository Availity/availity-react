import AvLocalStorage from '@availity/localstorage-core';
import avMessage from '@availity/message-core';
import { avUserApi } from '@availity/api-axios';
import dayjs from 'dayjs';

const localStorageCore = new AvLocalStorage();

export const SPACES_INITIAL_STATE = {
  spaces: [],
  loading: true,
  error: null,
};

export const spaceActions = {
  SPACES: (_, { spaces }) => ({
    spaces: spaces || [],
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

export const spacesReducer = (state, action) =>
  spaceActions[action.type](state, action);

export const sanitizeSpaces = spaces => {
  // Normalize space pairs ( [{ name, value }] => { name: value } )
  const pairFields = ['images', 'metadata', 'colors', 'icons', 'mapping'];
  return spaces.reduce((accum, spc) => {
    // Store reference to children
    spc.children =
      spc.children ||
      spaces.filter(
        space =>
          space.parentIDs &&
          space.parentIDs.some(parentId => parentId === spc.id)
      );

    // Store reference to parents
    spc.parents =
      spc.parents ||
      spaces.filter(
        space =>
          space.childIDs && space.childIDs.some(childId => childId === spc.id)
      );

    // Tranform name/value fields ( pairFields )
    pairFields.forEach(field => {
      if (spc[field] && Array.isArray(spc[field])) {
        spc[field] = spc[field].reduce((_accum, { name, value }) => {
          _accum[name] = value;
          return _accum;
        }, {});
      }
    });

    accum.push(spc);
    return accum;
  }, []);
};

export const isFunction = obj => typeof obj === 'function';

export const SpacesFragment = `
fragment SpaceFragment on SpaceResponse {
  totalCount
  perPage
  page
  spaces {
    id
    name
    shortName
    type
    activeDate
    description
    link {
      text
      target
      url
    }
    childIDs
    parentIDs
    payerIDs
    metadata {
      name
      value
    }
    colors {
      name
      value
    }
    icons {
      name
      value
    }
    images {
      name
      value
    }
    url
  }
}`;

export const updateParams = (uri, key, value) => {
  if (value === undefined) return uri;

  const re = new RegExp(`([?&])${key}=[^&]*`, 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';

  return re.test(uri)
    ? uri.replace(re, `$1${key}=${value}`)
    : `${uri}${separator}${key}=${value}`;
};

// Examples:
//
//    - http://www.example.com?foo=bar#hashme
//    - http://www.example.com
//    - http://www.example.com?foo=bar
//
export const updateUrl = (url, key, value) => {
  const splitURL = url.split('#');
  const hash = splitURL[1];
  const uri = updateParams(splitURL[0], key, value);

  const result = hash === undefined ? uri : `${uri}#${hash}`;

  return result;
};

/**
 * Top Apps Stuff
 */

const TOP_APPS = {
  ALLOWED_TYPES: ['application', 'linkout', 'navigation'],
  BLACKLIST: [
    'reporting',
    'how_to_guide_dental_providers',
    'my_account_profile',
    'my_administrators',
  ],
  KEYS: {
    LAST_UPDATED: 'top-apps-updated',
    VALUES: 'myTopApps',
  },
  // UPDATE_EVENT: 'av:topApps:updated',
};

const canTrackSpace = (spaceId, type) =>
  TOP_APPS.ALLOWED_TYPES.some(t => t === type) &&
  !TOP_APPS.BLACKLIST.some(id => id === spaceId);

const getLocalStorageTopApps = userId => {
  const topAppsValues = localStorageCore.get(
    `${TOP_APPS.KEYS.VALUES}-${userId}`
  );

  return topAppsValues;
};

// Bear with me
export const updateTopApps = async (spaceId, type) => {
  if (!spaceId || !type) return;

  // If we can track the space
  if (canTrackSpace(spaceId, type)) {
    const today = dayjs();

    // Grab the current user's id
    const { id: userId } = await avUserApi.me();

    // Grab the current top apps from localstorage
    const values = (await getLocalStorageTopApps(userId)) || {};

    // Update the last updated date. For use in top nav to actually sync with settings api
    localStorageCore.set(
      `${TOP_APPS.KEYS.LAST_UPDATED}-${userId}`,
      today.format()
    );

    const currentCount =
      values[spaceId] && typeof values[spaceId].count === 'number'
        ? values[spaceId].count
        : 0;

    values[spaceId] = {
      ...values[spaceId],
      count: currentCount + 1,
      lastUse: today.format(),
    };

    localStorageCore.set(`${TOP_APPS.KEYS.VALUES}-${userId}`, values);

    avMessage.send(TOP_APPS.UPDATE_EVENT);
  }
};
