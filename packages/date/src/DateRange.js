import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '@availity/icon';
import { InputGroup, Input, Button } from 'reactstrap';
import { DateRangePicker } from 'react-dates';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import get from 'lodash.get';
import pick from 'lodash.pick';
import moment from 'moment';
import '../polyfills';

import { isOutsideRange, limitPropType, isSameDay } from './utils';

const isoDateFormat = 'YYYY-MM-DD';

const relativeRanges = {
  Today: {
    startDate: now => now,
    endDate: now => now,
  },
  'Last 7 Days': {
    startDate: now => now.add(-6, 'd'),
    endDate: now => now,
  },
  'Last 30 Days': {
    startDate: now => now.add(-29, 'd'),
    endDate: now => now,
  },
  'Last 120 Days': {
    startDate: now => now.add(-119, 'd'),
    endDate: now => now,
  },
  'Last 6 Months': {
    startDate: now => now.add(-6, 'M'),
    endDate: now => now,
  },
  'Last 12 Months': {
    startDate: now => now.add(-12, 'M'),
    endDate: now => now,
  },
};

const DateRange = ({
  id,
  min,
  max,
  name,
  validate,
  onChange,
  onPickerFocusChange,
  innerRef,
  className,
  format,
  calendarIcon,
  startKey,
  endKey,
  datepickerProps,
  'data-testid': dataTestId,
  datepicker,
  autoSync,
  ranges: propsRanges,
  ...attributes
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [{ value = {} }, metadata] = useField({ name, validate });
  const [focusedInput, setFocusedInput] = useState(null);

  const calendarIconRef = useRef();

  const startId = `${(id || name).replace(/[^a-zA-Z0-9]/gi, '')}-start`;

  const endId = `${(id || name).replace(/[^a-zA-Z0-9]/gi, '')}-end`;

  const startValue = get(value, startKey);
  const endValue = get(value, endKey);

  const classes = classNames(
    'input-group-date-range',
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid',
    !startValue && !endValue && 'current-day-highlight',
    datepicker && 'av-calendar-show'
  );

  // For updating when we delete the current input
  const onInputChange = async val => {
    const isStart = focusedInput === 'startDate';
    const date = moment(
      val,
      [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'],
      true
    );

    const valueToSet = date.isValid() ? date.format(format) : null;

    await setFieldValue(
      name,
      {
        [startKey]: isStart ? valueToSet : startValue,
        [endKey]: !isStart ? valueToSet : endValue,
      },
      metadata.touched
    );

    if (focusedInput && isStart && date.isValid()) {
      setFocusedInput('endDate');
    } else if (focusedInput && !isStart && date.isValid()) {
      setFocusedInput();
    }
  };

  const onDatesChange = async ({ startDate, endDate }) => {
    const _startDate = (startDate && startDate.format(format)) || startValue;
    const _endDate = (endDate && endDate.format(format)) || endValue;
    await setFieldValue(
      name,
      {
        [startKey]: _startDate,
        [endKey]: _endDate,
      },
      _startDate && _endDate
    );

    if (_startDate && _endDate) {
      await setFieldTouched(name, true);
    }

    if (onChange) {
      onChange({
        [startKey]: _startDate,
        [endKey]: _endDate,
      });
    }
  };

  const syncDates = async () => {
    if (!metadata.touched) {
      let value;

      if (!startValue || !endValue) {
        value = startValue || endValue;
      }

      if (value) {
        await setFieldValue(
          name,
          {
            [startKey]: value,
            [endKey]: value,
          },
          true
        );
        await setFieldTouched(name, true);
      }
    }
  };

  const onFocusChange = async input => {
    if (!input) await setFieldTouched(name, true);
    if (autoSync) await syncDates();
    setFocusedInput(input);
    if (onPickerFocusChange) onPickerFocusChange({ focusedInput: input });
  };

  const getDateValue = val => {
    const date = moment(
      val,
      [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'],
      true
    );
    if (date.isValid()) return date;

    return null;
  };

  const renderDateRanges = () => {
    let ranges;
    if (typeof propsRanges === 'boolean' && propsRanges) {
      ranges = relativeRanges;
    } else if (propsRanges) {
      ranges = Array.isArray(propsRanges)
        ? pick(relativeRanges, propsRanges)
        : propsRanges;
    }

    return ranges ? (
      <div className="d-flex flex-column ml-2 mt-2">
        {Object.keys(ranges).map(text => {
          const { startDate: startDateFunc, endDate: endDateFunc } = ranges[
            text
          ];

          const presetStartDate = startDateFunc(moment());
          const presetEndDate = endDateFunc(moment());

          const isSelected =
            isSameDay(
              presetStartDate,
              moment(startValue, [
                isoDateFormat,
                format,
                'MMDDYYYY',
                'YYYYMMDD',
              ])
            ) &&
            isSameDay(
              presetEndDate,
              moment(endValue, [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'])
            );
          return (
            <Button
              key={text}
              className="mt-1 mb-1"
              color={isSelected ? 'primary' : 'default'}
              size="sm"
              onClick={() => {
                onDatesChange({
                  startDate: presetStartDate,
                  endDate: presetEndDate,
                });

                setFocusedInput(undefined);
                setFieldTouched(startKey, true);
                setFieldTouched(endKey, true);

                // // Focucs the calendar icon once clicked because we don't
                // // want to get back in the loop of opening the calendar
                calendarIconRef.current.parentElement.focus();
              }}
            >
              {text}
            </Button>
          );
        })}
      </div>
    ) : null;
  };

  return (
    <>
      <Input name={name} style={{ display: 'none' }} className={classes} />
      <InputGroup
        disabled={attributes.disabled}
        className={classes}
        data-testid={`date-range-input-group-${name}`}
        onChange={({ target }) => {
          if (target.id === startId || target.id === endId) {
            onInputChange(target.value);
          }
        }}
      >
        <DateRangePicker
          minimumNights={0}
          {...datepickerProps}
          startDate={getDateValue(startValue)}
          startDateId={startId}
          enableOutsideDays
          endDate={getDateValue(endValue)}
          endDateId={endId}
          calendarInfoPosition="before"
          onDatesChange={onDatesChange}
          focusedInput={focusedInput}
          disabled={attributes.disabled}
          onFocusChange={onFocusChange}
          renderCalendarInfo={renderDateRanges}
          customArrowIcon="-"
          isOutsideRange={isOutsideRange(min, max, format)}
          customInputIcon={
            datepicker
              ? React.cloneElement(calendarIcon, {
                  ref: calendarIconRef,
                  onClick: () => {
                    if (focusedInput) {
                      setFocusedInput(undefined);
                    }
                  },
                })
              : undefined
          }
          showDefaultInputIcon={datepicker}
          inputIconPosition="after"
          numberOfMonths={2}
        />
      </InputGroup>
    </>
  );
};

DateRange.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validate: PropTypes.func,
  min: limitPropType,
  max: limitPropType,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onPickerFocusChange: PropTypes.func,
  calendarIcon: PropTypes.node,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  format: PropTypes.string,
  datepicker: PropTypes.bool,
  datepickerProps: PropTypes.object,
  startKey: PropTypes.string,
  endKey: PropTypes.string,
  'data-testid': PropTypes.string,
  autoSync: PropTypes.bool,
  ranges: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
  ]),
};

DateRange.defaultProps = {
  calendarIcon: <Icon name="calendar" data-testid="calendar-icon" />,
  format: isoDateFormat,
  startKey: 'startDate',
  endKey: 'endDate',
  datepicker: true,
};

export default DateRange;
