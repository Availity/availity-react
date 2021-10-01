import { avUserPermissionsApi, avRegionsApi } from '@availity/api-axios';

export const getRegion = async (region) => {
  if (region === true) {
    const resp = await avRegionsApi.getCurrentRegion();

    return resp?.data?.regions?.[0]?.id;
  }

  return region;
};

export const getPermissions = async (permissions, region) => {
  if (!permissions) return {};

  const response = await avUserPermissionsApi.getPermissions(permissions, await getRegion(region));

  return response.reduce((prev, cur) => {
    prev[cur.id] = cur;
    return prev;
  }, {});
};

export const checkPermission = (permission, resources, organizationId, customerId) => {
  if (!permission) return false;

  let isAuthorizedForCustomerId = true;
  let isAuthorizedForOrganizationId = true;
  let isAuthorizedForResources = true;

  // Check if user has org in list based on organizationId
  if (organizationId) {
    isAuthorizedForOrganizationId =
      permission.organizations.filter(({ id: orgId }) => orgId === organizationId).length > 0;
  }

  // Check if user has org in list based on customerId
  if (customerId) {
    isAuthorizedForCustomerId =
      permission.organizations.filter(({ customerId: orgCustomerId }) => orgCustomerId === customerId).length > 0;
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

export const checkPermissions = async (permissions, region, resources, organizationId, customerId) => {
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
