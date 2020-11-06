import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@availity/icon';
import { InputGroup, Input, Button, Row, Col } from 'reactstrap';
import { DateRangePicker } from 'react-dates';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import pick from 'lodash.pick';
import moment from 'moment';
import '../polyfills';

import { isOutsideRange, limitPropType, buildYearPickerOptions } from './utils';

const isoDateFormat = 'YYYY-MM-DD';

const relativeRanges = {
  Today: {
    startDate: moment({ hour: 0 }), // today, 0:00:00.000
    endDate: moment({ hour: 0 }),
  },
  'Last 7 Days': {
    startDate: moment({ hour: 0 }).subtract(6, 'days'),
    endDate: moment({ hour: 0 }),
  },
  'Last 30 Days': {
    startDate: moment({ hour: 0 }).subtract(29, 'days'),
    endDate: moment({ hour: 0 }),
  },
  'Last 120 Days': {
    startDate: moment({ hour: 0 }).subtract(119, 'days'),
    endDate: moment({ hour: 0 }),
  },
  'Last 6 Months': {
    startDate: moment({ hour: 0 }).subtract(6, 'months'),
    endDate: moment({ hour: 0 }),
  },
  'Last 12 Months': {
    startDate: moment({ hour: 0 }).subtract(12, 'months'),
    endDate: moment({ hour: 0 }),
  },
};

const yearPickerStyles = {
  minWidth: '100%', // 4 digit years not wide enough to fill column
};

const hiddenInputStyles = {
  display: 'none',
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
  datepickerProps,
  'data-testid': dataTestId,
  datepicker,
  autoSync,
  ranges: propsRanges,
  customArrowIcon,
  ...attributes
}) => {
  const { setFieldValue, setFieldTouched, validateField } = useFormikContext();
  const [{ value = {} }, metadata] = useField({ name, validate });
  const [focusedInput, setFocusedInput] = useState(null);

  const calendarIconRef = useRef();

  const startId = `${(id || name).replace(/[^\da-z]/gi, '')}-start`;
  const endId = `${(id || name).replace(/[^\da-z]/gi, '')}-end`;

  const startValue = value.startDate || '';
  const endValue = value.endDate || '';

  const startValueMoment = useMemo(
    () => moment(startValue, [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD']),
    [startValue, format]
  );

  const endValueMoment = useMemo(
    () => moment(endValue, [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD']),
    [endValue, format]
  );

  const classes = classNames(
    'input-group-date-range',
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid',
    !startValue && !endValue && 'current-day-highlight',
    datepicker && 'av-calendar-show'
  );

  // Should only run validation once per real change to component, instead of each time setFieldValue/Touched is called.
  // By batching multiple calls for validation we can avoid multiple moment comparisons of the same values
  // and stale values can be avoided without resorting to async/await: https://github.com/jaredpalmer/formik/issues/2083#issuecomment-571259235
  useEffect(() => {
    if (metadata.touched || startValue || endValue) {
      validateField(name);
    }
  }, [metadata.touched, startValue, endValue, name, validateField]);

  // For updating when we delete the current input
  const onInputChange = (val) => {
    const isStart = focusedInput === 'startDate';
    const date = moment(
      val,
      [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'],
      true
    );

    const valueToSet = date.isValid() ? date.format(format) : null;

    setFieldValue(
      name,
      {
        startDate: isStart ? valueToSet : startValue,
        endDate: !isStart ? valueToSet : endValue,
      },
      false
    );

    if (focusedInput && isStart && date.isValid()) {
      setFocusedInput('endDate');
    } else if (focusedInput && !isStart && date.isValid()) {
      setFocusedInput();
    }
  };

  const onDatesChange = ({ startDate, endDate }) => {
    const _startDate = (startDate && startDate.format(format)) || startValue;
    const _endDate = (endDate && endDate.format(format)) || endValue;
    setFieldValue(
      name,
      {
        startDate: _startDate,
        endDate: _endDate,
      },
      false
    );

    if (_startDate && _endDate) {
      setFieldTouched(name, true, false);
    }

    if (onChange) {
      onChange({
        startDate: _startDate,
        endDate: _endDate,
      });
    }
  };

  const syncDates = () => {
    if (!metadata.touched) {
      let value;

      if (!startValue || !endValue) {
        value = startValue || endValue;
      }

      if (value) {
        setFieldValue(
          name,
          {
            startDate: value,
            endDate: value,
          },
          false
        );
        setFieldTouched(name, true, false);
      }
    }
  };

  const onFocusChange = (input) => {
    if (!input && !autoSync) setFieldTouched(name, true, false);
    if (autoSync) syncDates();
    if (focusedInput !== input) setFocusedInput(input);
    if (onPickerFocusChange) onPickerFocusChange({ focusedInput: input });
  };

  const getDateValue = (val) => {
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
        {Object.keys(ranges).map((relativeRange) => {
          const { startDate, endDate } = ranges[relativeRange];

          // Comparing moments with unit as 'millisecond' avoids moment cloning
          const isSelected =
            startDate.isSame(startValueMoment, 'millisecond') &&
            endDate.isSame(endValueMoment, 'millisecond');

          return (
            <Button
              key={relativeRange}
              className="my-1"
              color={isSelected ? 'primary' : 'default'}
              size="sm"
              onClick={() => {
                onDatesChange({
                  startDate,
                  endDate,
                });

                setFocusedInput(null);

                // Focus the calendar icon once clicked because we don't
                // want to get back in the loop of opening the calendar
                calendarIconRef.current.parentElement.focus();
              }}
            >
              {relativeRange}
            </Button>
          );
        })}
      </div>
    ) : null;
  };

  const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    const yearPickerOptions = buildYearPickerOptions(min, max, month, format);
    return (
      <Row>
        <Col>
          <select
            data-testid="monthPicker"
            aria-label="month picker"
            value={month.month()}
            onChange={(e) => {
              onMonthSelect(month, e.target.value);
            }}
          >
            {moment.months().map((label, value) => (
              <option key={label} value={value} aria-label={label}>
                {label}
              </option>
            ))}
          </select>
        </Col>
        <Col>
          <select
            data-testid="yearPicker"
            aria-label="year picker"
            style={yearPickerStyles}
            value={month.year()}
            onChange={(e) => {
              onYearSelect(month, e.target.value);
            }}
          >
            {yearPickerOptions.map(({ value, label }) => (
              <option key={label} value={value} aria-label={label}>
                {label}
              </option>
            ))}
          </select>
        </Col>
      </Row>
    );
  };

  renderMonthElement.propTypes = {
    month: PropTypes.instanceOf(moment),
    onMonthSelect: PropTypes.func,
    onYearSelect: PropTypes.func,
  };

  return (
    <>
      <Input name={name} style={hiddenInputStyles} className={classes} />
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
          renderMonthElement={renderMonthElement}
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
          customArrowIcon={customArrowIcon}
          isOutsideRange={isOutsideRange(min, max, format)}
          customInputIcon={
            datepicker
              ? React.cloneElement(calendarIcon, {
                  ref: calendarIconRef,
                  onClick: () => {
                    if (focusedInput) {
                      setFocusedInput();
                    }
                  },
                })
              : undefined
          }
          showDefaultInputIcon={datepicker}
          inputIconPosition="after"
          numberOfMonths={2}
          navPosition="navPositionBottom"
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
  'data-testid': PropTypes.string,
  autoSync: PropTypes.bool,
  ranges: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
  ]),
  customArrowIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

DateRange.defaultProps = {
  calendarIcon: <Icon name="calendar" data-testid="calendar-icon" />,
  format: isoDateFormat,
  datepicker: true,
};

export default DateRange;
