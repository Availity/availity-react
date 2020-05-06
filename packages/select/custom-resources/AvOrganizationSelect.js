import React from 'react';
import PropTypes from 'prop-types';
import {
  avFilteredOrganizationsApi,
  avOrganizationsApi,
} from '@availity/api-axios';
import { ResourceSelect } from '..';

const AvOrganizationSelect = ({
  name,
  parameters: { permissionId = [], resourceIds = [], regionId } = {},
  ...props
}) => {
  // Convert permissions and resources to array so that the dependency array is kept consistent
  permissionId =
    typeof permissionId === 'string' ? [permissionId] : permissionId;
  resourceIds = typeof resourceIds === 'string' ? [resourceIds] : resourceIds;

  const OrganizationSelect = React.useMemo(
    () =>
      ResourceSelect.create({
        resource:
          resourceIds.length > 0 && permissionId.length > 0
            ? avFilteredOrganizationsApi
            : avOrganizationsApi,
        labelKey: 'name',
      }),
    // React will not be able to statically check if values are the same
    // but without spreading values, there would be new array references on each render,
    // causing new api instances to be created each time
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...resourceIds, ...permissionId]
  );

  return (
    <OrganizationSelect
      name={name}
      parameters={{ permissionId, resourceIds, regionId }}
      {...props}
    />
  );
};

AvOrganizationSelect.propTypes = {
  name: PropTypes.string.isRequired,
  parameters: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export default AvOrganizationSelect;
