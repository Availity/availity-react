import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import { FormGroup, Feedback } from '@availity/form';
import DateRange from './DateRange';

const DateRangeField = ({ name, label, ...props }) => (
  <FormGroup for={name}>
    {label && <Label for={name}>{label}</Label>}
    <DateRange name={name} {...props} />
    <Feedback name={name} />
  </FormGroup>
);

DateRangeField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default DateRangeField;
