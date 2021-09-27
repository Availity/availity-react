import PropTypes from 'prop-types';

const CurrencyCell =
  ({ currency = 'USD', defaultValue = '', locales = 'en-us' }) =>
  ({ value }) => {
    if (!value) {
      return defaultValue;
    }

    value = typeof value === 'string' ? Number.parseFloat(value) : value;
    const formatNum = new Intl.NumberFormat(locales, {
      style: 'currency',
      currency,
    }).format;
    return formatNum(value);
  };

CurrencyCell.propTypes = {
  defaultValue: PropTypes.string,
};

export default CurrencyCell;
