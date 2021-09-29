import React from 'react';
import PropTypes from 'prop-types';

const CurrencyCell = ({
  currency = 'USD',
  defaultValue = '',
  locales = 'en-us',
}) => {
  const CurrencyCellDef = ({ value }) => {
    let formattedValue;
    if (!value) {
      formattedValue = defaultValue;
    }

    value = typeof value === 'string' ? Number.parseFloat(value) : value;
    const formatNum = new Intl.NumberFormat(locales, {
      style: 'currency',
      currency,
    }).format;

    formattedValue = formatNum(value);
    return <span title={formattedValue}>{formattedValue}</span>;
  };

  CurrencyCellDef.propTypes = {
    value: PropTypes.string,
  };

  return CurrencyCellDef;
};

CurrencyCell.propTypes = {
  defaultValue: PropTypes.string,
};

export default CurrencyCell;
