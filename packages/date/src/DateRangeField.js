import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import { FormGroup, Feedback } from '@availity/form';
import DateRange from './DateRange';

const DateRangeField = ({ name, label, labelClass, labelHidden, labelAttrs, id = name, ...props }) => (
  <FormGroup for={name}>
    {label && (
      <Label for={`${id.replace(/[^\da-z]/gi, '')}-start`} className={labelClass} hidden={labelHidden} {...labelAttrs}>
        {label}
      </Label>
    )}
    <DateRange name={name} id={id} {...props} />
    <Feedback name={name} />
  </FormGroup>
);

DateRangeField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  labelClass: PropTypes.string,
  labelHidden: PropTypes.bool,
  labelAttrs: PropTypes.object,
};

export default DateRangeField;
