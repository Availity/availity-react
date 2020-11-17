import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import { FormGroup, Feedback } from '@availity/form';
import Date from './Date';

const DateField = ({
  name,
  label,
  labelClass,
  labelHidden,
  labelAttrs,
  id = name,
  ...props
}) => (
  <FormGroup for={name}>
    {label && (
      <Label
        for={`${id}-picker`}
        className={labelClass}
        hidden={labelHidden}
        {...labelAttrs}
      >
        {label}
      </Label>
    )}
    <Date name={name} id={id} {...props} />
    <Feedback name={name} />
  </FormGroup>
);

DateField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  labelClass: PropTypes.string,
  labelHidden: PropTypes.bool,
  labelAttrs: PropTypes.object,
};

export default DateField;
