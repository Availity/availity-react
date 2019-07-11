import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@availity/icon';
import { Input, InputGroup } from 'reactstrap';
import { DateRangePicker } from 'react-dates';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import './css/react-dates-overrides.css';

import { isOutsideRange, limitPropType } from './utils';

const AvDateRange = ({
  id,
  min,
  max,
  name,
  onChange,
  onPickerFocusChange,
  innerRef,
  className,
  format,
  calendarIcon,
  'data-testid': dataTestId,
  ...attributes
}) => {
  const { setTouched, setValues } = useFormikContext();
  const [inputRef, setInputRef] = useState(null);
  const [field, metadata] = useField(name);
  const [focusedInput, setFocusedInput] = useState(null);

  const startId = `${(id || name).replace(/[^a-zA-Z0-9]/gi, '')}-start`;

  const endId = `${(attributes.id || name).replace(/[^a-zA-Z0-9]/gi, '')}-end`;

  const classes = classNames(
    'input-group-date-range',
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

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

  const onClose = ({ startDate, endDate }) => {
    const _startDate = (startDate && startDate.format(format)) || '';
    const _endDate = (endDate && endDate.format(format)) || '';
    const range = `${_startDate}-${_endDate}`;
    inputRef.value = range;
    field.onBlur({ target: inputRef });
    if (!metadata.touched) {
      setTouched({ [name]: true });
    }
  };

  const onDatesChange = async ({ startDate, endDate }) => {
    const _startDate = (startDate && startDate.format(format)) || '';
    const _endDate = (endDate && endDate.format(format)) || '';
    const range = `${_startDate}-${_endDate}`;
    await setValues({ [name]: range });
    inputRef.value = range;
    field.onChange({ target: inputRef });
    if (onChange) {
      onChange({ value: range });
    }
  };

  const onFocusChange = input => {
    setFocusedInput(input);
    if (onPickerFocusChange) onPickerFocusChange({ focusedInput: input });
  };

  let [startDate, endDate] = (field.value || '').split('-');
  startDate = (startDate && moment(new Date(startDate).toISOString())) || null;
  endDate = (endDate && moment(new Date(endDate).toISOString())) || null;

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
        data-testid={`date-range-input-group-${name}`}
      >
        <DateRangePicker
          {...attributes}
          startDate={startDate}
          startDateId={startId}
          endDate={endDate}
          endDateId={endId}
          onDatesChange={onDatesChange}
          focusedInput={focusedInput}
          onFocusChange={onFocusChange}
          isOutsideRange={isOutsideRange(min, max)}
          customInputIcon={calendarIcon}
          inputIconPosition="after"
          onClose={onClose}
          numberOfMonths={1}
        />
      </InputGroup>
    </>
  );
};

AvDateRange.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  min: limitPropType,
  max: limitPropType,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onPickerFocusChange: PropTypes.func,
  calendarIcon: PropTypes.node,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  format: PropTypes.string,
  'data-testid': PropTypes.string,
};

AvDateRange.defaultProps = {
  calendarIcon: <Icon name="calendar" />,
  format: 'MM/DD/YYYY',
};

export default AvDateRange;
