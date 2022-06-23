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
  name: PropTypes.string.isRequired,
};

export default AvOrganizationSelect;
