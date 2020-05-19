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

export const buildYearPickerOptions = (
  min,
  max,
  month,
  format = 'MM/DD/YYYY'
) => {
  const yearPickerOptions = [];
  let minYear;
  let maxYear;

  if (min) {
    if (moment.isMoment(min)) {
      minYear = min.year();
    } else if (min.value !== undefined && min.units) {
      minYear = moment()
        .subtract(min.value, min.units)
        .year();
    } else if (typeof min === 'string') {
      const minMoment = moment(min, [
        isoDateFormat,
        format,
        'MMDDYYYY',
        'YYYYMMDD',
      ]);

      minYear = minMoment.year();
    }
  } else {
    minYear = moment().year() - 100;
  }

  if (max) {
    if (moment.isMoment(max)) {
      maxYear = max.year();
    } else if (max.value !== undefined && max.units) {
      maxYear = moment()
        .add(max.value, max.units)
        .year();
    } else if (typeof max === 'string') {
      const maxMoment = moment(max, [
        isoDateFormat,
        format,
        'MMDDYYYY',
        'YYYYMMDD',
      ]);

      maxYear = maxMoment.year();
    }
  } else {
    maxYear = moment().year();
  }

  // As user scrolls forwards or backwards (or inputs date on their own), it's possible for them to end up
  // with a year outside the min or max range. To avoid displaying incorrect year values in <select/> , we should
  // compare month.year() to min and max and use the appropriate value for min/max
  if (month.year() > maxYear) {
    maxYear = month.year();
  } else if (month.year() < minYear) {
    minYear = month.year();
  }

  for (let year = minYear; year <= maxYear; year++) {
    yearPickerOptions.push({
      value: year,
      label: `${year}`,
    });
  }
  return yearPickerOptions;
};
