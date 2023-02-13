import React from 'react';
import PropTypes from 'prop-types';
import { avOrganizationsApi } from '@availity/api-axios';

import ResourceSelect from './ResourceSelect';

const OrganizationSelect = ResourceSelect.create({
  resource: avOrganizationsApi,
  labelKey: 'name',
  valueKey: 'id',
});

const AvOrganizationSelect = ({ name, resourceIds, permissionIds, ...props }) => (
  <OrganizationSelect
    name={name}
    additionalPostGetArgs={resourceIds || permissionIds ? { resourceIds, permissionIds } : undefined}
    {...props}
  />
);

AvOrganizationSelect.propTypes = {
  name: PropTypes.string.isRequired,
  /**
   * The organizations API from sdk-js accepts a resourceIds prop inside of additionalPostGetArgs that can be either a string or nested array of strings.
   * When AvOrganizationSelect has a resourceIds prop, then the results of the postGet call to organizations will be filtered, containing only organizations that have the specified permissions and resources.
   * This is useful when a payer space app is restricted to permission A and resource B, a user can pass A and B as permissionIds and resourceIds into AvOrganizationSelect and expect the dropdown to only contain authorized organizations for that user in that app, instead of all the organizations that user belongs to.
   * AND logic is enforced by putting resources in an array together.
   */
  resourceIds: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
        PropTypes.string,
        PropTypes.number,
      ])
    ),
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * The organizations API from sdk-js accepts a permissionIds prop inside of additionalPostGetArgs that can be either a string or nested array of strings.
   * When used with resourceIds, the results of the postGet call to organizations will be filtered, containing only organizations that have the specified permissions and resources.
   * If additionalPostGetArgs.permissionsIds exists, these values will be used over parameters.permissionId.
   * This is useful when a payer space app is restricted to permission A and resource B, a user can pass A and B as permissionIds and resourceIds into AvOrganizationSelect and expect the dropdown to only contain authorized organizations for that user in that app, instead of all the organizations that user belongs to. AND logic is enforced by putting permissions in an array together.
   */
  permissionIds: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
        PropTypes.string,
        PropTypes.number,
      ])
    ),
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default AvOrganizationSelect;
