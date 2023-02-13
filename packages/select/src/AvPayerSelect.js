import React from 'react';
import PropTypes from 'prop-types';
import AvApi from '@availity/api-axios';

import ResourceSelect from './ResourceSelect';

const extendedPayersApi = new AvApi({ path: '/api/internal', name: 'extended-payers' });

extendedPayersApi.all = async (parameters) =>
  extendedPayersApi.query({
    params: { state: parameters.region, transactionType: parameters.tranTypeCode },
    headers: { 'X-Availity-Customer-ID': parameters.customerId },
  });

const AvPayerSelect = ({ name, customerId, ...props }) => (
  <ResourceSelect
    name={name}
    labelKey="payerName"
    valueKey="payerId"
    resource={extendedPayersApi}
    pageAll
    customerId={customerId}
    requiredParams={['region', 'tranTypeCode']}
    watchParams={['region', 'tranTypeCode']}
    {...props}
  />
);

AvPayerSelect.propTypes = {
  /**
   * The extended-payers API from aries requires a customerId prop that must be a string.
   * The AvPayerSelect will use the customerId prop in the request header, X-Availity-Customer-Id, of the all call to extended-payers.
   * This is necessary for the AvPayerSelect select to only contain payers that are accesible and related to the organization specified, and not all the organizations that the user belongs.
   */
  customerId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default AvPayerSelect;
