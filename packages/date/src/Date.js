import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import { useToggle } from '@availity/hooks';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Icon from '@availity/icon';
import { InputGroup, Input } from 'reactstrap';
import moment from 'moment';

import { isOutsideRange, limitPropType } from './utils';

export const isoDateFormat = 'YYYY-MM-DD';

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
  datePickerProps,
  'data-testid': dataTestId,
  ...attributes
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, metadata] = useField(name);
  const [isFocused, toggleIsFocused] = useToggle(false);
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

  // For updating when we delete the current input
  const onInputChange = async value => {
    const date = moment(
      value,
      [isoDateFormat, format, 'MMDDYYYY', 'YYYYMMDD'],
      true
    );

    await setFieldValue(
      name,
      date.isValid() ? date.format(isoDateFormat) : '',
      metadata.touched
    );

    if (date.isValid()) {
      toggleIsFocused(false);
    }
  };

  const onPickerChange = async value => {
    if (value === null) return;

    let val = value;
    if (val instanceof Object && val.isValid()) {
      val = val.format(isoDateFormat);
    }

    await setFieldValue(name, val, false);

    if (onChange) {
      onChange(val);
    }
  };

  const onFocusChange = async ({ focused }) => {
    if (!focused) {
      await setFieldTouched(name, true);
    }

    toggleIsFocused(focused);
    if (onPickerFocusChange) onPickerFocusChange({ focused });
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
  datePickerProps: PropTypes.object,
};

AvDate.defaultProps = {
  calendarIcon: <Icon name="calendar" />,
  format: 'MM/DD/YYYY',
  datepicker: true,
};

export default AvDate;
