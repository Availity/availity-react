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
    await updateTopApps({ configurationId: 'space1', type: 'APPLICATION' }, 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(
      '{"space1":{"count":1,"lastUse":"2022-01-01T00:00:00+00:00"}}'
    );
  });

  it('should updateTopApps for resources', async () => {
    await updateTopApps({ configurationId: 'space2', type: 'RESOURCE' }, 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(
      '{"space2":{"count":1,"lastUse":"2022-01-01T00:00:00+00:00"}}'
    );
  });

  it('should updateTopApps for navigations', async () => {
    await updateTopApps({ configurationId: 'space3', type: 'NAVIGATION' }, 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(
      '{"space3":{"count":1,"lastUse":"2022-01-01T00:00:00+00:00"}}'
    );
  });

  it('should updateTopApps for multiple clicks', async () => {
    await updateTopApps({ configurationId: 'space1', type: 'APPLICATION' }, 'aka123456789');
    await updateTopApps({ configurationId: 'space1', type: 'APPLICATION' }, 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(
      '{"space1":{"count":2,"lastUse":"2022-01-01T00:00:00+00:00"}}'
    );
  });

  it('should not updateTopApps if no spaceId passed', async () => {
    await updateTopApps({ type: 'APPLICATION' }, 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(undefined);
  });

  it('should not updateTopApps if no type passed', async () => {
    await updateTopApps({ configurationId: 'space1' }, 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(undefined);
  });

  it('should not updateTopApps if type is not allowed', async () => {
    await updateTopApps({ configurationId: 'space2', type: 'SAML' }, 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(undefined);
  });

  it('should not updateTopApps if id is blacklisted', async () => {
    await updateTopApps({ configurationId: 'reporting', type: 'APPLICATION' }, 'aka123456789');

    expect(window.localStorage.getItem('myTopApps-aka123456789')).toEqual(undefined);
  });
});
