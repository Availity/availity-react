import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import moment from 'moment';
import { useToggle } from '@availity/hooks';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './css/react-dates-overrides.css';
import Icon from '@availity/icon';
import { InputGroup, Input } from 'reactstrap';

export const isoDateFormat = 'YYYY-MM-DD';

const isOutsideRange = (min, max) => day => {
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

const AvDate = ({
  className,
  name,
  datepicker,
  calendarIcon,
  innerRef,
  onChange,
  onPickerFocusChange,
  min,
  max,
  datePickerProps,
  format,
  ...attributes
}) => {
  const { setTouched, setValues } = useFormikContext();
  const [field, metadata] = useField(name);
  const [isFocused, toggleIsFocused] = useToggle(false);
  const [inputRef, setInputRef] = useState(null);

  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  const pickerId = `${(attributes.id || name).replace(
    /[^a-zA-Z0-9]/gi,
    ''
  )}-picker`;

  const onPickerChange = async value => {
    if (value === null) return;

    let val = value;
    if (val instanceof Object && val.isValid()) {
      val = val.format(format);
    }

    await setValues({ [name]: val });
    inputRef.value = val;
    field.onChange({ target: inputRef });
    if (onChange) {
      onChange({ value: val });
    }
  };

  const onClose = ({ date }) => {
    inputRef.value = date && date.format(format);
    field.onBlur({ target: inputRef });
  };

  const onFocusChange = ({ focused }) => {
    if (!metadata.touched && !focused) {
      setTouched({ [name]: true });
    }

    toggleIsFocused(focused);
    if (onPickerFocusChange) onPickerFocusChange({ focused });
  };

  const getRef = el => {
    setInputRef(el);

    if (innerRef) {
      if (typeof innerRef === 'function') {
        innerRef(el);
      } else {
        innerRef.current = el;
      }
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

  return (
    <>
      <Input
        innerRef={getRef}
        style={{ display: 'none' }}
        name={name}
        className={classes}
      />
      <InputGroup
        disabled={attributes.disabled}
        className={classes}
        onChange={({ target }) =>
          target.id === pickerId && onPickerChange(target.value)
        }
        data-testid={`date-input-group-${name}`}
      >
        <SingleDatePicker
          {...attributes}
          placeholder={format.toLowerCase()}
          id={pickerId}
          date={getDateValue()}
          onDateChange={onPickerChange}
          focused={isFocused}
          onFocusChange={onFocusChange}
          numberOfMonths={1}
          isOutsideRange={isOutsideRange(min, max)}
          customInputIcon={calendarIcon}
          inputIconPosition="after"
          onClose={onClose}
        />
      </InputGroup>
    </>
  );
};

const limitPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({ value: PropTypes.number, units: PropTypes.string }),
  PropTypes.shape({ _d: PropTypes.string, _isValid: PropTypes.func }), // moment prop type
]);

AvDate.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  min: limitPropType,
  max: limitPropType,
  datepicker: PropTypes.bool,
  calendarIcon: PropTypes.node,
  onChange: PropTypes.func,
  onPickerFocusChange: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  datePickerProps: PropTypes.object,
  format: PropTypes.string,
};

AvDate.defaultProps = {
  datepicker: true,
  calendarIcon: <Icon name="calendar" />,
  format: 'MM/DD/YYYY',
};

export default AvDate;
