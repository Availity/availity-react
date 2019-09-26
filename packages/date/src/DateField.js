import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import { FormGroup, Feedback } from '@availity/form';
import Date from './Date';

const DateField = ({ name, label, ...props }) => (
  <FormGroup for={name}>
    {label && typeof label === 'string' ? (
      <Label for={name}>{label}</Label>
    ) : (
      label
    )}
    <Date name={name} {...props} />
    <Feedback name={name} />
  </FormGroup>
);

DateField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.node,
};

export default DateField;
