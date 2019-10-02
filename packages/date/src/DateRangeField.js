import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import { FormGroup, Feedback } from '@availity/form';
import DateRange from './DateRange';

const DateRangeField = ({ name, label, labelClass, labelHidden, labelAttrs, id = name, ...props }) => (
  <FormGroup for={name}>
    {label && (
      <Label 
        for={`${id.replace(/[^a-zA-Z0-9]/gi, '')}-start`}
        className={labelClass}
        hidden={labelHidden}
        {...labelAttrs}
        >
          {label}
        </Label>
    )}
    <DateRange name={name} {...props} />
    <Feedback name={name} />
  </FormGroup>
);

DateRangeField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  labelClass: PropTypes.string,
  labelHidden: PropTypes.bool,
  labelAttrs: PropTypes.object
};

export default DateRangeField;
