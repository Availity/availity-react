/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';
import avMessage from '@availity/message-core';

type Nullable<T> = { [K in keyof T]?: T[K] | null | undefined };

const TOP_APPS = {
  ALLOWED_TYPES: ['APPLICATION', 'RESOURCE', 'NAVIGATION'],
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
  UPDATE_EVENT: 'av:topApps:updated',
};

const getItemLocalStorage = (key: string) => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

type TopAppConfiguration = {
  configurationId: string;
  type: string;
};

const isTrackable = <T extends TopAppConfiguration>(
  configuration: Nullable<T>
): configuration is T => {
  const { configurationId, type } = configuration;
  return (
    !!configurationId &&
    !!type &&
    TOP_APPS.ALLOWED_TYPES.includes(type) &&
    !TOP_APPS.BLACKLIST.includes(configurationId)
  );
};

const getLocalStorageTopApps = (akaname: string) => {
  const topAppsValues = getItemLocalStorage(
    `${TOP_APPS.KEYS.VALUES}-${akaname}`
  );

  return topAppsValues;
};

export const updateTopApps = async <T extends TopAppConfiguration>(
  configuration: Nullable<T>,
  akaname: string
) => {
  if (isTrackable(configuration)) {
    const { configurationId } = configuration;
    const now = dayjs().format();

    const currentTopApps = (await getLocalStorageTopApps(akaname)) || {};

    // For use in top nav to sync with settings api
    window.localStorage.setItem(
      `${TOP_APPS.KEYS.LAST_UPDATED}-${akaname}`,
      now
    );

    const currentCount =
      currentTopApps[configurationId] &&
      typeof currentTopApps[configurationId].count === 'number'
        ? currentTopApps[configurationId].count
        : 0;

    currentTopApps[configurationId] = {
      ...currentTopApps[configurationId],
      count: currentCount + 1,
      lastUse: now,
    };

    window.localStorage.setItem(
      `${TOP_APPS.KEYS.VALUES}-${akaname}`,
      JSON.stringify(currentTopApps)
    );

    avMessage.send(TOP_APPS.UPDATE_EVENT);
  }
};
