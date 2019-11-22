import { useState, useEffect } from 'react';
import { avUserPermissionsApi, avRegionsApi } from '@availity/api-axios';

const warned = {};

function warnOnce(message) {
  if (!warned[message]) {
    // eslint-disable-next-line no-console
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message); // eslint-disable-line no-console
    }
    warned[message] = true;
  }
}

export default (
  permissions,
  { organizationId, customerId, region = true } = {}
) => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const getRegion = async () => {
    if (region === true) {
      const resp = await avRegionsApi.getCurrentRegion();
      return (
        (resp &&
          resp.data &&
          resp.data.regions &&
          resp.data.regions[0] &&
          resp.data.regions[0].id) ||
        undefined
      );
    }
    if (region) {
      return region;
    }
    return undefined;
  };

  const checkPermission = permission => {
    if (!permission) return false;

    if (organizationId) {
      if (customerId) {
        warnOnce(
          'You provided both `organizationId` and `customerId` to Authorize but both cannot be used together; `organizationId` will be used and `customerId` will be ignored. If you want to use `customerId` do not provide `organizationId`.'
        );
      }
      return (
        permission.organizations.filter(
          ({ id: orgId }) => orgId === organizationId
        ).length > 0
      );
    }

    if (customerId) {
      return (
        permission.organizations.filter(
          ({ customerId: orgCustomerId }) => orgCustomerId === customerId
        ).length > 0
      );
    }

    return true;
  };

  // TODO: Move most of this logic to avUserPermissionsApi or something more common.
  const checkPermissions = async () => {
    const permissionsSets = Array.isArray(permissions)
      ? permissions
      : [permissions];
    const permissionsList = [].concat(...permissionsSets);
    const newPermissions = (await avUserPermissionsApi.getPermissions(
      permissionsList,
      await getRegion()
    )).reduce((prev, cur) => {
      prev[cur.id] = cur;
      return prev;
    }, {});

    const authorized = permissionsSets.some(permissionSet => {
      if (Array.isArray(permissionSet)) {
        return permissionSet.every(permission =>
          checkPermission(newPermissions[permission])
        );
      }
      return checkPermission(newPermissions[permissionSet]);
    });
    if (
      permissionsList.join() ===
      []
        .concat(...(Array.isArray(permissions) ? permissions : [permissions]))
        .join()
    ) {
      setLoading(false);
      setAuthorized(authorized);
    }
  };

  useEffect(() => {
    if (!loading) setLoading(true);
    checkPermissions();
    // todo - optimize this so we only have a permissions effect for fetching
    // and the others are just filters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId, region, customerId, permissions]);

  return [authorized, loading];
};
