import React from 'react';
import PropTypes from 'prop-types';

const PayerLogo = ({ spaceId, payerId, ...props }) => {
  if (!payerId && !spaceId) return null;
  const url = spaceId
    ? `/static/spaces/${spaceId}/banner.png`
    : `/public/apps/eligibility/images/value-add-logos/${payerId.replace(
        /\s/g,
        ''
      )}.gif`;

  return <img src={url} alt="Payer logo" {...props} />;
};

PayerLogo.propTypes = {
  spaceId: PropTypes.string,
  payerId: PropTypes.string,
};

export default PayerLogo;
