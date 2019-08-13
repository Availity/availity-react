import moment from 'moment';
import PropTypes from 'prop-types';

const isoDateFormat = 'YYYY-MM-DD';

export const isOutsideRange = (min, max, format = 'MM/DD/YYYY') => day => {
  let isOutsideMax = false;
  let isOutsideMin = false;

  if (min) {
    if (moment.isMoment(min)) {
      isOutsideMin = day.isBefore(min);
    }

    if (typeof min === 'string') {
      isOutsideMin = day.isBefore(
        moment(min, [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'])
      );
    }

    if (min.value !== undefined && min.units) {
      isOutsideMin = day.isBefore(moment().subtract(min.value, min.units));
    }
  }

  if (max) {
    if (moment.isMoment(max)) {
      isOutsideMax = day.isAfter(max);
    }

    if (typeof max === 'string') {
      isOutsideMax = day.isAfter(
        moment(max, [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'])
      );
    }

    if (max.value !== undefined && max.units) {
      isOutsideMax = day.isAfter(moment().add(max.value, max.units));
    }
  }

  return isOutsideMax || isOutsideMin;
};

export const limitPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({ value: PropTypes.number, units: PropTypes.string }),
  PropTypes.shape({ _d: PropTypes.string, _isValid: PropTypes.func }), // moment prop type
]);
