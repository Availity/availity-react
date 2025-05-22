import { getLocation, getRel, getTarget, getUrl, isEssentialsUrl } from '../src/util';

describe('AvLink utils', () => {
  const APPS = 'https://apps.availity.com';
  const ESSENTIALS = 'https://essentials.availity.com';

  beforeEach(() => {
    global.jsdom.reconfigure({
      url: 'https://apps.availity.com/public/apps/home/#!/',
    });
  });

  describe('getLocation', () => {
    test('should return current href in apps', () => {
      expect(getLocation(APPS).href).toBe(`${APPS}/`);
    });
    test('should return current href in essentials', () => {
      expect(getLocation(ESSENTIALS).href).toBe(`${ESSENTIALS}/`);
    });
  });

  describe('getTarget', () => {
    const SELF = '_self';
    test('handles newBody', () => {
      expect(getTarget('newBody')).toBe(SELF);
    });
    test('handles BODY', () => {
      expect(getTarget('BODY')).toBe(SELF);
    });
    test('handles TAB', () => {
      expect(getTarget('TAB')).toBe('_blank');
    });
    test('handles underline prefix', () => {
      expect(getTarget('_test')).toBe('_test');
    });
    test('handles other', () => {
      expect(getTarget('foobar')).toBe('foobar');
    });
    test('handles no target', () => {
      expect(getTarget()).toBe(SELF);
    });
  });

  describe('getUrl', () => {
    test('apps domain loadApp false and absolute false', () => {
      expect(getUrl(APPS, false, false)).toBe(APPS);
    });
    test('apps domain loadApp false and absolute true', () => {
      expect(getUrl(APPS, false, true)).toBe(APPS);
    });
    test('apps domain loadApp true and absolute false', () => {
      expect(getUrl(APPS, true, false)).toBe('/public/apps/home/#!/loadApp?appUrl=https%3A%2F%2Fapps.availity.com');
    });
    test('apps domain loadApp true and absolute true', () => {
      expect(getUrl(APPS, true, true)).toBe(APPS);
    });
    // test('essentials domain loadApp false and absolute false', () => {
    //   expect(getUrl(ESSENTIALS, false, false)).toBe(
    //     '/public/apps/home/#!/loadApp?appUrl=https%3A%2F%2Fessentials.availity.com'
    //   );
    // });
    // test('essentials domain loadApp false and absolute true', () => {
    //   expect(getUrl(ESSENTIALS, false, true)).toBe(
    //     '/public/apps/home/#!/loadApp?appUrl=https%3A%2F%2Fessentials.availity.com'
    //   );
    // });
    // test('essentials domain loadApp true and absolute false', () => {
    //   expect(getUrl(ESSENTIALS, true, false)).toBe(
    //     '/public/apps/home/#!/loadApp?appUrl=https%3A%2F%2Fessentials.availity.com'
    //   );
    // });
    // test('essentials domain loadApp true and absolute true', () => {
    //   expect(getUrl(ESSENTIALS, true, true)).toBe(
    //     '/public/apps/home/#!/loadApp?appUrl=https%3A%2F%2Fessentials.availity.com'
    //   );
    // });
  });

  describe('getRel', () => {
    test('handles _blank target and relative url', () => {
      expect(getRel(APPS, '_blank', false)).toBeUndefined();
    });
    test('handles _blank target and absolute url', () => {
      expect(getRel(APPS, '_blank', true)).toBeUndefined();
    });
    test('handles non _blank target and relative url', () => {
      expect(getRel(APPS, '_blank', false)).toBeUndefined();
    });
    test('handles non _blank target and absolute url', () => {
      expect(getRel(APPS, '_blank', true)).toBeUndefined();
    });
  });

  describe('isEssentialsUrl', () => {
    test('handles apps domain', () => {
      expect(isEssentialsUrl(APPS)).toBeFalsy();
    });

    test('handles essentials domain', () => {
      expect(isEssentialsUrl(ESSENTIALS)).toBeTruthy();
      expect(isEssentialsUrl(ESSENTIALS.replace('essentials', 'test-essentials'))).toBeTruthy();
      expect(isEssentialsUrl(ESSENTIALS.replace('essentials', 'qa-essentials'))).toBeTruthy();
    });
  });
});
