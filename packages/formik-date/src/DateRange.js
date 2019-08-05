import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@availity/icon';
import { InputGroup } from 'reactstrap';
import { DateRangePicker } from 'react-dates';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import get from 'lodash.get';
import moment from 'moment';

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
  datepicker,
  ...attributes
}) => {
  const { setFieldValue, setFieldTouched, setValues } = useFormikContext();
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

  console.log("Metadata",metadata);


  const onClose = ({ startDate, endDate }) => {
    const _startDate = (startDate && startDate.format(format)) || startValue;
    const _endDate = (endDate && endDate.format(format)) || endValue;
    
    console.log("Setting start and end date",{
      _startDate,_endDate
    })
    setFieldValue(name,{
      startDate: _startDate,
      endDate: _endDate
    })
    if (!metadata.touched && _startDate && _endDate) {
      console.log("Setting touched");
      setFieldTouched(name,true);
    }
  };

  const onDatesChange = async ({ startDate, endDate }) => {
    const _startDate = (startDate && startDate.format(format)) || startValue;
    const _endDate = (endDate && endDate.format(format)) || endValue;

    console.log("StartDate",_startDate);
    console.log("EndDate",_endDate);
    setFieldValue(name,{
      startDate: _startDate,
      endDate: _endDate
    })
    if (onChange) {
      onChange({ value: range });
    }
  };

  const onFocusChange = input => {
    setFocusedInput(input);
    if (onPickerFocusChange) onPickerFocusChange({ focusedInput: input });
  };

  let startDate = startValue ? moment(startValue,format) :null;
  let endDate = endValue ? moment(endValue,format) :null;

  return (
    <>
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
          customArrowIcon="-"
          isOutsideRange={isOutsideRange(min, max)}
          customInputIcon={datepicker ? calendarIcon : undefined}
          showDefaultInputIcon={datepicker}
          inputIconPosition="after"
          onClose={onClose}
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
  'data-testid': PropTypes.string,
};

AvDateRange.defaultProps = {
  calendarIcon: <Icon name="calendar" />,
  format: 'MM/DD/YYYY',
  datepicker: true
};

export default AvDateRange;
