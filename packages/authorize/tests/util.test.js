import { avUserPermissionsApi, avRegionsApi } from '@availity/api-axios';
import { checkPermission, checkPermissions, getPermissions, getRegion } from '../src/util';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  avUserPermissionsApi.getPermissions.mockResolvedValue([
    {
      id: '1234',
      organizations: [
        {
          id: '1111',
          customerId: '1194',
          resources: [
            {
              id: '1',
            },
            {
              id: '2',
            },
            {
              id: '3',
            },
          ],
        },
      ],
    },
  ]);

  avRegionsApi.getCurrentRegion.mockResolvedValue({
    data: {
      regions: [
        {
          id: 'WA',
          value: 'Washington',
          currentlySelected: true,
        },
      ],
    },
  });
});

describe('useAuthorize', () => {
  test('should fetch region', async () => {
    const region = await getRegion(true);

    expect(region).toEqual('WA');
    expect(avRegionsApi.getCurrentRegion).toHaveBeenCalled();
  });

  test('should not fetch region', async () => {
    const region = await getRegion('FL');

    expect(region).toEqual('FL');
    expect(avRegionsApi.getCurrentRegion).not.toHaveBeenCalled();
  });

  test('should check permission', () => {
    // Fail if no permisison passed
    expect(checkPermission()).toBeFalsy();

    // Pass if only permission passed
    expect(checkPermission('123')).toBeTruthy();

    // Pass when orgId or customerId matches
    expect(checkPermission({ organizations: [{ id: '111' }] }, undefined, '111')).toBeTruthy();
    expect(checkPermission({ organizations: [{ customerId: '111' }] }, undefined, '', '111')).toBeTruthy();
  });

  test('should fetch permissions', async () => {
    const permissions = await getPermissions('1234');

    expect(permissions['1234'].id).toEqual('1234');
  });

  test('should check permissions', async () => {
    // Fail because org doesn't match
    expect(await checkPermissions('1234', true, undefined, '999', '1194')).toBeFalsy();

    // Pass when no constraints
    expect(await checkPermissions('1234')).toBeTruthy();
  });
});
