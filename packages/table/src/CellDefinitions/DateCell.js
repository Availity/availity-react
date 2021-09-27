import PropTypes from 'prop-types';
import moment from 'moment';

const DateCell =
  ({ dateFormat }) =>
  ({ value }) =>
    value ? moment(value).format(dateFormat) : null;
DateCell.propTypes = {
  dateFormat: PropTypes.string,
};

export default DateCell;
