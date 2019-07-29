import moment from 'moment';
import PropTypes from 'prop-types';

export const isOutsideRange = (min, max) => day => {
  if (moment.isMoment(min) && moment.isMoment(max)) {
    return day.isBefore(min) || day.isAfter(max);
  }

  if (typeof min === 'string' && typeof max === 'string') {
    return day.isBefore(moment(min)) || day.isAfter(moment(max));
  }

  if (
    min &&
    min.value !== undefined &&
    min.units &&
    max &&
    max.value !== undefined &&
    max.units
  ) {
    const start = moment().subtract(min.value, min.units);
    const end = moment().add(max.value, max.units);
    return day.isBefore(start) || day.isAfter(end);
  }

  return false;
};

export const limitPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({ value: PropTypes.number, units: PropTypes.string }),
  PropTypes.shape({ _d: PropTypes.string, _isValid: PropTypes.func }), // moment prop type
]);