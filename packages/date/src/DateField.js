import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import { FormGroup, Feedback } from '@availity/form';
import Date from './Date';

const DateField = ({ name, label, labelClass, labelHidden, labelAttrs, ...props }) => (
  <FormGroup for={name}>
    {label && (
      <Label 
        for={name}
        className={labelClass}
        hidden={labelHidden}
        {...labelAttrs}
        >
          {label}
        </Label>
    )}
    <Date name={name} {...props} />
    <Feedback name={name} />
  </FormGroup>
);
 
DateField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.node,
  labelClass: PropTypes.string,
  labelHidden: PropTypes.bool,
  labelAttrs: PropTypes.object
};

export default DateField;
