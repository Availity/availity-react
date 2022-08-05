import { avUserPermissionsApi, avRegionsApi } from '@availity/api-axios';

import type { Permission, RequestedPermissions, RequestedResources } from './types';

/**
 * Fetch the current region for the logged in user.
 *
 * If the region is a string then it will be returned without fetching.
 */
export const getRegion = async (region?: boolean | string): Promise<string | undefined> => {
  if (region === true) {
    const resp = await avRegionsApi.getCurrentRegion();

    return resp?.data?.regions?.[0]?.id;
  }

  return region || undefined;
};

/**
 * Fetch the permissions for the logged in user
 */
export const getPermissions = async (
  permissions: RequestedPermissions,
  region?: string
): Promise<Record<string, Permission>> => {
  if (!permissions) return {};

  // TODO: fix these types
  const response = await avUserPermissionsApi.getPermissions(permissions as string[], region);

  return response.reduce<Record<string, Permission>>((prev, cur) => {
    prev[cur.id] = cur;
    return prev;
  }, {});
};

/**
 * Validate whether the user has the permission
 */
export const checkPermission = (
  permission?: Permission,
  resources?: RequestedResources,
  organizationId?: string,
  customerId?: string
): boolean => {
  if (!permission) return false;

  let isAuthorizedForCustomerId = true;
  let isAuthorizedForOrganizationId = true;
  let isAuthorizedForResources = true;

  // Check if user has org in list based on organizationId
  if (organizationId) {
    isAuthorizedForOrganizationId = permission.organizations.some(({ id: orgId }) => orgId === organizationId);
  }

  // Check if user has org in list based on customerId
  if (customerId) {
    isAuthorizedForCustomerId = permission.organizations.some(
      ({ customerId: orgCustomerId }) => orgCustomerId === customerId
    );
  }

  // Check if resources are in response
  if (resources !== undefined) {
    const resourceSets = Array.isArray(resources) ? resources : [resources];

    isAuthorizedForResources =
      resourceSets.length === 0 ||
      resourceSets.some((resourceSet) => {
        if (Array.isArray(resourceSet)) {
          return resourceSet.every((resource) =>
            permission.organizations.some(({ resources: orgResources = [] }) =>
              orgResources.some(({ id }) => `${id}` === `${resource}`)
            )
          );
        }

        return permission.organizations.some(({ resources: orgResources = [] }) =>
          orgResources.some(({ id }) => `${id}` === `${resourceSet}`)
        );
      });
  }

  return isAuthorizedForCustomerId && isAuthorizedForOrganizationId && isAuthorizedForResources;
};

/**
 * Validate multiple permissions
 */
export const checkPermissions = async (
  permissions: RequestedPermissions,
  region?: string,
  resources?: RequestedResources,
  organizationId?: string,
  customerId?: string
): Promise<boolean> => {
  if (!permissions) return false;

  permissions = Array.isArray(permissions) ? permissions : [permissions];

  const response = await getPermissions(permissions, region);

  const authorized = permissions.some((permissionSet) => {
    if (Array.isArray(permissionSet)) {
      return permissionSet.every((permission) =>
        checkPermission(response[permission], resources, organizationId, customerId)
      );
    }

    return checkPermission(response[permissionSet], resources, organizationId, customerId);
  });

  return authorized;
};
