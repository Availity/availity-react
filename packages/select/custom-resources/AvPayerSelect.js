import React from 'react';
import PropTypes from 'prop-types';
import AvApi from '@availity/api-axios';

import { ResourceSelect } from '..';

const extendedPayersApi = new AvApi({ path: '/api/internal', name: 'extended-payers'});

extendedPayersApi.all = parameters => { extendedPayersApi.query({params: { state: parameters.region, transactionType: parameters.tranTypeCode }, headers: {'X-Availity-Customer-ID': parameters.customerId}})};

const PayerSelect = ResourceSelect.create({
    resource: extendedPayersApi,
    labelKey: 'payerName',
    pageAll: false,
  });
  
  const AvPayerSelect = ({ name, customerId, ...props }) => (
    <PayerSelect
      name={name}
      customerId={customerId}
      requiredParams={['region', 'tranTypeCode']}
      watchParams={['region', 'tranTypeCode']}
      {...props}
    />
  );
  
  AvPayerSelect.propTypes = {
    customerId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };
  
  export default AvPayerSelect;
  