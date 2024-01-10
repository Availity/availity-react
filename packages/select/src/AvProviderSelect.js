import React from 'react';
import PropTypes from 'prop-types';
import { avProvidersApi } from '@availity/api-axios';
import ResourceSelect from './ResourceSelect';

const ProviderSelect = ResourceSelect.create({
  resource: avProvidersApi,
  labelKey: 'uiDisplayName',
  valueKey: 'npi',
  requiredParams: ['customerId'],
  watchParams: ['customerId'],
});

const AvProviderSelect = ({ searchAll = false, parameters: originalParams, ...props }) => {
  let parameters = originalParams;
  if (!searchAll && typeof parameters !== 'function') {
    parameters = { ...originalParams, role: 'OFFICE' };
  }
  return <ProviderSelect {...props} parameters={parameters} />;
};

AvProviderSelect.propTypes = {
  searchAll: PropTypes.bool,
  parameters: PropTypes.oneOf(PropTypes.object, PropTypes.func),
};

export default AvProviderSelect;
