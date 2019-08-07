import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '@availity/icon';
import { InputGroup, Input } from 'reactstrap';
import { DateRangePicker } from 'react-dates';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import get from 'lodash.get';
import moment from 'moment';

import { isOutsideRange, limitPropType } from './utils';

const isoDateFormat = "YYYY-MM-DD";

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
  datepickerProps,
  'data-testid': dataTestId,
  datepicker,
  ...attributes
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [{ value = {}}, metadata] = useField(name);
  const [focusedInput, setFocusedInput] = useState(null);

  const startId = `${(id || name).replace(/[^a-zA-Z0-9]/gi, '')}-start`;

  const endId = `${(attributes.id || name).replace(/[^a-zA-Z0-9]/gi, '')}-end`;

  const startValue = get(value,'startDate');
  const endValue = get(value,'endDate');

  const classes = classNames(
    'input-group-date-range',
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid',
    (!startValue && !endValue) && 'current-day-highlight',
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

      const valueToSet = date.isValid() ? date.format(isoDateFormat): null;
  
      await setFieldValue(name,{
        startDate: isStart ? valueToSet : startValue,
        endDate: !isStart ? valueToSet: endValue
      },metadata.touched);

      if(focusedInput && isStart && date.isValid()) {
        setFocusedInput('endDate');
      }else if(focusedInput && !isStart && date.isValid()){
        setFocusedInput();
      }
    }

  const onDatesChange = async ({ startDate, endDate }) => {
    const _startDate = (startDate && startDate.format(format)) || startValue;
    const _endDate = (endDate && endDate.format(format)) || endValue;
    await setFieldValue(name,{
      startDate: _startDate,
      endDate: _endDate
    },_startDate && _endDate)
    
    if(_startDate && _endDate) {
      await setFieldTouched(name,true);
    }

    if (onChange) {
      onChange({
        startDate: _startDate,
        endDate: _endDate
      });
    }
  };

  const onFocusChange = async input => {
    if (!input) {
      await setFieldTouched(name,true);
    }
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


  return (
    <>
    <Input
        name={name}
        style={{ display: 'none' }}
        className={classes}
      />
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
          {...datepickerProps}
          startDate={getDateValue(startValue)}
          startDateId={startId}
          endDate={getDateValue(endValue)}
          endDateId={endId}
          onDatesChange={onDatesChange}
          focusedInput={focusedInput}
          disabled={attributes.disabled}
          onFocusChange={onFocusChange}
          customArrowIcon="-"
          isOutsideRange={isOutsideRange(min, max)}
          customInputIcon={datepicker ? calendarIcon : undefined}
          showDefaultInputIcon={datepicker}
          inputIconPosition="after"
          numberOfMonths={2}
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
  datepicker: PropTypes.bool,
  datepickerProps: PropTypes.object,
  'data-testid': PropTypes.string,
};

AvDateRange.defaultProps = {
  calendarIcon: <Icon name="calendar" />,
  format: 'MM/DD/YYYY',
  datepicker: true
};

export default AvDateRange;
