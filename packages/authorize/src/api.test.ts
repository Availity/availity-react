import { server } from '@availity/mock/src/server';
import { getRegion, getPermissions, checkPermission, checkPermissions } from './api';

describe('authorize api', () => {
  // start msw server
  beforeAll(() => server.listen());

  // clear cache and reset msw handlers
  afterEach(() => server.resetHandlers());

  // terminate the server
  afterAll(() => server.close());

  test('getRegion returns region code', async () => {
    const region = await getRegion(true);
    expect(region).toBe('FL');
  });

  test('getRegion returns undefined when given falsey value', async () => {
    const region = await getRegion(false);
    expect(region).toBeUndefined();
  });

  test('getRegion returns value when not falsey', async () => {
    const region = await getRegion('FL');
    expect(region).toBe('FL');
  });

  test('getPermissions returns object with the permission as the key', async () => {
    const permissions = await getPermissions(['1234']);
    expect(permissions['1234'].id).toBe('1234');
  });

  test('checkPermission returns true when user has permission', () => {
    // no extra validation required
    expect(
      checkPermission({
        id: '1',
        description: 'test',
        organizations: [{ id: '123', customerId: '456', name: 'test', resources: [] }],
      })
    ).toBeTruthy();

    // validate by resources
    expect(
      checkPermission(
        {
          id: '1',
          description: 'test',
          organizations: [{ id: '123', customerId: '456', name: 'test', resources: [{ id: '999' }] }],
        },
        ['999']
      )
    ).toBeTruthy();

    // validate by organizationId
    expect(
      checkPermission(
        {
          id: '1',
          description: 'test',
          organizations: [{ id: '123', customerId: '456', name: 'test', resources: [] }],
        },
        undefined,
        '123'
      )
    ).toBeTruthy();

    // validate by customerId
    expect(
      checkPermission(
        {
          id: '1',
          description: 'test',
          organizations: [{ id: '123', customerId: '456', name: 'test', resources: [] }],
        },
        undefined,
        undefined,
        '456'
      )
    ).toBeTruthy();
  });

  test('checkPermission returns false when user does not have permission', () => {
    // when no permission present, return false
    expect(checkPermission()).toBeFalsy();

    // validate by resources
    expect(
      checkPermission(
        {
          id: '1',
          description: 'test',
          organizations: [{ id: '123', customerId: '456', name: 'test', resources: [{ id: '999' }] }],
        },
        ['123']
      )
    ).toBeFalsy();

    // validate by organizationId
    expect(
      checkPermission(
        {
          id: '1',
          description: 'test',
          organizations: [{ id: '123', customerId: '456', name: 'test', resources: [] }],
        },
        undefined,
        '111'
      )
    ).toBeFalsy();

    // validate by customerId
    expect(
      checkPermission(
        {
          id: '1',
          description: 'test',
          organizations: [{ id: '123', customerId: '456', name: 'test', resources: [] }],
        },
        undefined,
        undefined,
        '999'
      )
    ).toBeFalsy();
  });

  test('checkPermissions returns true when user has permission', async () => {
    // the 1234 id is setup in msw to return a response
    expect(await checkPermissions(['1234'])).toBeTruthy();
  });

  test('checkPermissions returns false when user does not have permission', async () => {
    // the 123 id is setup in msw to NOT return a response
    expect(await checkPermissions(['123'])).toBeFalsy();
  });
});
