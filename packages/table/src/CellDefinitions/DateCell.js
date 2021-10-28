import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DateCell = ({ dateFormat }) => {
  const DateCellDef = ({ value }) => {
    let formattedValue;
    if (value) {
      formattedValue = moment(value).format(dateFormat);
    }
    return <span title={formattedValue}>{formattedValue}</span>;
  };

  DateCellDef.propTypes = {
    value: PropTypes.string,
  };

  return DateCellDef;
};

DateCell.propTypes = {
  dateFormat: PropTypes.string,
};

export default DateCell;
