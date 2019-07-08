import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import { FormGroup, Feedback } from '@availity/form';
import Date from './Date';

const DateField = ({ name, label }) => {
  return (
    <FormGroup for={name}>
      {label && <Label for={name}>{label}</Label>}
      <Date name={name} />
      <Feedback name={name} />
    </FormGroup>
  );
};

DateField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string
}

export default DateField;