import React from 'react';
import PropTypes from 'prop-types';
import { avOrganizationsApi } from '@availity/api-axios';
import { ResourceSelect } from '..';

const OrganizationSelect = ResourceSelect.create({
  resource: avOrganizationsApi,
  labelKey: 'name',
});

const AvOrganizationSelect = ({
  name,
  resourceIds,
  permissionIds,
  ...props
}) => {
  return (
    <OrganizationSelect
      name={name}
      additionalPostGetArgs={{ resourceIds, permissionIds }}
      {...props}
    />
  );
};

AvOrganizationSelect.propTypes = {
  resourceIds: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  ]),
  permissionIds: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  ]),
  name: PropTypes.string.isRequired,
};

export default AvOrganizationSelect;
