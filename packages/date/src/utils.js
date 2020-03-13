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
      const maxMoment = moment(max, [
        isoDateFormat,
        format,
        'MMDDYYYY',
        'YYYYMMDD',
      ]);
      if (!maxMoment._f || maxMoment._f.indexOf('H') === -1) {
        maxMoment.hour(23);
        maxMoment.minute(59);
        maxMoment.second(59);
      }
      isOutsideMax = day.isAfter(maxMoment);
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

export const isSameDay = (a, b) => {
  if (!moment.isMoment(a) || !moment(b)) return false;
  // Compare least significant, most likely to change units first
  // Moment's isSame clones moment inputs and is a tad slow
  return (
    a.date() === b.date() && a.month() === b.month() && a.year() === b.year()
  );
};

export const buildYearPickerOptions = (minYear, maxYear, month) => {
  // As user scrolls forwards or backwards (or inputs date on their own), it's possible for them to end up
  // with a year outside the min or max range. To avoid displaying incorrect year values in <select/> , we should
  // compare month.year() to minYear and maxYear and use the appropriate value for min/max
  const yearPickerOptions = [];

  let min = minYear;
  let max = maxYear;
  if (month.year() > maxYear) {
    max = month.year();
  } else if (month.year() < minYear) {
    min = month.year();
  }

  for (let year = min; year <= max; year++) {
    yearPickerOptions.push({
      value: year,
      label: `${year}`,
    });
  }
  return yearPickerOptions;
};
