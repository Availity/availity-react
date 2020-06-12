import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { isFeatureEnabled, getFeatureCache } from '..';

const mock = new MockAdapter(axios, { delayResponse: 1000 });
const features = [
  'AV-1234',
  'AV-2345',
  'AV-3456',
  'AV-4567',
  'AV-5678',
  'AV-6789',
];
mock.onGet('features.json').reply(200, features);

describe('isFeatureEnabled', () => {
  test('should return an awaitable promise', () => {
    expect(isFeatureEnabled('AV-1234').then).toBeInstanceOf(Function);
  });

  describe('returned awaitable promise', () => {
    test('should result in a boolean value', async cb => {
      expect(await isFeatureEnabled('AV-1234')).toBe(false);
      expect(await isFeatureEnabled('AV-12345')).toBe(true);
      cb();
    });

    test('should result in true when the key is not in the disabled features array', async cb => {
      expect(await isFeatureEnabled('AV-9876')).toBe(true);
      expect(await isFeatureEnabled('AV-8765')).toBe(true);
      expect(await isFeatureEnabled('AV-7654')).toBe(true);
      expect(await isFeatureEnabled('AV-6543')).toBe(true);
      expect(await isFeatureEnabled('AV-5432')).toBe(true);
      expect(await isFeatureEnabled('AV-4321')).toBe(true);
      cb();
    });

    test('should result in false when the feature is in the disabled features array', async cb => {
      expect(await isFeatureEnabled('AV-1234')).toBe(false);
      expect(await isFeatureEnabled('AV-2345')).toBe(false);
      expect(await isFeatureEnabled('AV-3456')).toBe(false);
      expect(await isFeatureEnabled('AV-4567')).toBe(false);
      expect(await isFeatureEnabled('AV-5678')).toBe(false);
      expect(await isFeatureEnabled('AV-6789')).toBe(false);
      cb();
    });
  });

  test('should treat an array as "or", requiring only one of the features to be enabled to be true', async cb => {
    expect(await isFeatureEnabled(['AV-9876'])).toBe(true);
    expect(await isFeatureEnabled(['AV-8765', 'AV-9876'])).toBe(true);
    expect(await isFeatureEnabled(['AV-7654', 'AV-8765', 'AV-9876'])).toBe(
      true
    );
    expect(await isFeatureEnabled(['AV-6543', 'AV-7654', 'AV-1234'])).toBe(
      true
    );
    expect(await isFeatureEnabled(['AV-6543', 'AV-1234', 'AV-2345'])).toBe(
      true
    );
    expect(await isFeatureEnabled(['AV-1234'])).toBe(false);
    expect(await isFeatureEnabled(['AV-1234', 'AV-2345'])).toBe(false);
    expect(await isFeatureEnabled(['AV-1234', 'AV-2345', 'AV-3456'])).toBe(
      false
    );
    cb();
  });

  test('should treat nested array as "and", ensuring all features are enabled', async cb => {
    expect(await isFeatureEnabled([['AV-9876']])).toBe(true);
    expect(await isFeatureEnabled([['AV-8765', 'AV-9876']])).toBe(true);
    expect(await isFeatureEnabled([['AV-7654', 'AV-8765', 'AV-9876']])).toBe(
      true
    );
    expect(await isFeatureEnabled([['AV-6543', 'AV-7654', 'AV-1234']])).toBe(
      false
    );
    expect(await isFeatureEnabled([['AV-6543', 'AV-1234', 'AV-2345']])).toBe(
      false
    );
    expect(await isFeatureEnabled([['AV-1234', 'AV-2345', 'AV-3456']])).toBe(
      false
    );
    expect(await isFeatureEnabled([['AV-1234']])).toBe(false);
    cb();
  });

  test('should be able to mix "and"s and "or"s', async cb => {
    expect(await isFeatureEnabled([['AV-1234'], ['AV-9876']])).toBe(true);
    expect(await isFeatureEnabled(['AV-1234', ['AV-9876']])).toBe(true);
    expect(await isFeatureEnabled(['AV-1234', ['AV-8765', 'AV-9876']])).toBe(
      true
    );
    expect(
      await isFeatureEnabled(['AV-9874', ['AV-7654', 'AV-8765', 'AV-1234']])
    ).toBe(true);
    expect(await isFeatureEnabled(['AV-1234', ['AV-6543', 'AV-7654']])).toBe(
      true
    );
    expect(await isFeatureEnabled(['AV-1234', ['AV-6543', 'AV-2345']])).toBe(
      false
    );
    expect(
      await isFeatureEnabled(['AV-1234', ['AV-1234', 'AV-2345', 'AV-3456']])
    ).toBe(false);
    expect(
      await isFeatureEnabled([
        ['AV-1234', 'AV-9874'],
        'AV-2345',
        'AV-4567',
        ['AV-1234', 'AV-2345', 'AV-3456'],
      ])
    ).toBe(false);
    expect(await isFeatureEnabled([['AV-1234']])).toBe(false);
    cb();
  });

  describe('featureCache', () => {
    test('should return an awaitable promise', () => {
      expect(getFeatureCache().then).toBeInstanceOf(Function);
    });
  });
});
