import { cleanup } from '@testing-library/react';
import { updateTopApps } from '../src/helpers';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();

describe('updateTopApps', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2022-01-01').getTime());
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });
  afterEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
    cleanup();
  });

  it('should updateTopApps for applications', async () => {
    await updateTopApps('space1', 'APPLICATION', 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(
      '{"space1":{"count":1,"lastUse":"2022-01-01T00:00:00+00:00"}}'
    );
  });

  it('should updateTopApps for resources', async () => {
    await updateTopApps('space2', 'RESOURCE', 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(
      '{"space2":{"count":1,"lastUse":"2022-01-01T00:00:00+00:00"}}'
    );
  });

  it('should updateTopApps for navigations', async () => {
    await updateTopApps('space3', 'NAVIGATION', 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(
      '{"space3":{"count":1,"lastUse":"2022-01-01T00:00:00+00:00"}}'
    );
  });

  it('should updateTopApps for multiple clicks', async () => {
    await updateTopApps('space1', 'APPLICATION', 'aka123456789');
    await updateTopApps('space1', 'APPLICATION', 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(
      '{"space1":{"count":2,"lastUse":"2022-01-01T00:00:00+00:00"}}'
    );
  });

  it('should not updateTopApps if no spaceId passed', async () => {
    await updateTopApps(undefined, 'APPLICATION', 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(undefined);
  });

  it('should not updateTopApps if no type passed', async () => {
    await updateTopApps('space1', undefined, 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(undefined);
  });

  it('should not updateTopApps if type is not allowed', async () => {
    await updateTopApps('space2', 'SAML', 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(undefined);
  });

  it('should not updateTopApps if id is blacklisted', async () => {
    await updateTopApps('reporting', 'APPLICATION', 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(undefined);
  });
});
