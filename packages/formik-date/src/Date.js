import React, { useState, useEffect } from 'react';
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
import { InputGroup,Input } from 'reactstrap';
// import { Input } from '@availity/form';

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
  label,
  value: valueFromProps,
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
  const [value, setValue] = useState(valueFromProps);
  const [isFocused, toggleIsFocused] = useToggle(false);
  const [inputRef, setInputRef] = useState(null);

  useEffect(() => {
    setValue(valueFromProps);
  }, [valueFromProps]);

  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  const pickerId = `${(attributes.id || name).replace(
    /[^a-zA-Z0-9]/gi,
    ''
  )}-picker`;

  const onPickerChange = async val => {
    if (!metadata.touched) {
      setTouched({ [name]: true });
    }

    setValue(val);
    await setValues({ [name]: (val && val.format(format)) || null });
    inputRef.value = val && val.format(format);
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

  return (
    <>
      <Input
        innerRef={getRef}
        style={{ display: 'none' }}
        name={name}
        className={classes}
        value={field.value || ''}
      />
      <InputGroup disabled={attributes.disabled} className={classes}>
      <SingleDatePicker
        {...attributes}
        placeholder={format.toLowerCase()}
        id={pickerId}
        date={value || null}
        onDateChange={onPickerChange}
        focused={isFocused}
        onFocusChange={onFocusChange}
        numberOfMonths={1}
        isOutsideRange={isOutsideRange(min, max)}
        customInputIcon={calendarIcon}
        inputIconPosition="after"
        onClose={onClose}
      /></InputGroup>
    </>
  );
};

const limitPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({ value: PropTypes.number, units: PropTypes.string }),
  PropTypes.shape({ _d: PropTypes.string, _isValid: PropTypes.func }), // moment prop type
]);

AvDate.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.object,
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
  calendarIcon: <Icon name="calendar" className="btn-light" />,
  format: 'MM/DD/YYYY',
};

export default AvDate;
