import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import Icon from '@availity/icon';
import { InputGroup, Input, Row, Col } from 'reactstrap';
import moment from 'moment';
import '../polyfills';
import '../styles.scss';

import { isOutsideRange, limitPropType, buildYearPickerOptions } from './utils';

export const isoDateFormat = 'YYYY-MM-DD';

const yearPickerStyles = {
  minWidth: '100%', // 4 digit years not wide enough to fill column
};

const AvDate = ({
  className,
  name,
  calendarIcon,
  innerRef,
  onChange,
  onPickerFocusChange,
  min,
  max,
  datepicker,
  format,
  validate,
  datePickerProps,
  'data-testid': dataTestId,
  ...attributes
}) => {
  const { setFieldValue, setFieldTouched, validateField } = useFormikContext();
  const [field, metadata] = useField({
    name,
    validate,
  });
  const [isFocused, setIsFocused] = useState(false);
  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid',
    !field.value && 'current-day-highlight',
    datepicker && 'av-calendar-show'
  );

  const pickerId = `${(attributes.id || name).replace(
    /[^a-zA-Z0-9]/gi,
    ''
  )}-picker`;

  // Should only run validation once per real change to component, instead of each time setFieldValue/Touched is called.
  // By batching multiple calls for validation we can avoid multiple moment comparisons of the same values
  // and stale values can be avoided without resorting to async/await: https://github.com/jaredpalmer/formik/issues/2083#issuecomment-571259235
  useEffect(() => {
    if (field.value || metadata.touched) {
      validateField(name);
    }
  }, [field.value, metadata.touched, name, validateField]);

  // For updating when we delete the current input
  const onInputChange = value => {
    const date = moment(
      value,
      [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'],
      true
    );
    const isoFormatted = date.format(isoDateFormat);
    setFieldValue(
      name,
      date.isValid() ? isoFormatted : '',
      false
    );
    setFieldTouched(name, true, false);

    if (date.isValid()) {
      if (isFocused !== false) {
        setIsFocused(false);
      }
      if (onChange) {
        onChange(isoFormatted);
      }
    }
  };

  const onPickerChange = value => {
    if (value === null) return;

    let val = value;
    if (val instanceof Object && val.isValid()) {
      val = val.format(isoDateFormat);
    }

    setFieldValue(name, val, false);
    setFieldTouched(name, true, false);

    if (onChange) {
      onChange(val);
    }
  };

  const onFocusChange = ({ focused }) => {
    if (!focused) {
      setFieldTouched(name, true, false);
    }

    if (focused !== undefined && isFocused !== focused) {
      setIsFocused(focused);
    }
    if (onPickerFocusChange) {
      onPickerFocusChange({ focused });
    }
  };

  const getDateValue = () => {
    const date = moment(
      field.value,
      [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'],
      true
    );
    if (date.isValid()) return date;

    return null;
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
            onChange={e => {
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
            onChange={e => {
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
      <Input name={name} style={{ display: 'none' }} className={classes} />
      <InputGroup
        disabled={attributes.disabled}
        className={classes}
        onChange={({ target }) =>
          target.id === pickerId && onInputChange(target.value)
        }
        data-testid={`date-input-group-${name}`}
      >
        <SingleDatePicker
          renderMonthElement={renderMonthElement}
          {...datePickerProps}
          disabled={attributes.disabled}
          id={pickerId}
          placeholder={format.toLowerCase()}
          date={getDateValue()}
          onDateChange={onPickerChange}
          focused={isFocused}
          onFocusChange={onFocusChange}
          numberOfMonths={1}
          isOutsideRange={isOutsideRange(min, max)}
          customInputIcon={datepicker ? calendarIcon : undefined}
          showDefaultInputIcon={datepicker}
          inputIconPosition="after"
          navPosition="navPositionBottom"
        />
      </InputGroup>
    </>
  );
};

AvDate.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  min: limitPropType,
  max: limitPropType,
  calendarIcon: PropTypes.node,
  onChange: PropTypes.func,
  onPickerFocusChange: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  format: PropTypes.string,
  'data-testid': PropTypes.string,
  datepicker: PropTypes.bool,
  validate: PropTypes.func,
  datePickerProps: PropTypes.object,
};

AvDate.defaultProps = {
  calendarIcon: <Icon name="calendar" />,
  format: 'MM/DD/YYYY',
  datepicker: true,
};

export default AvDate;
