import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Feedback, Label } from '@availity/form';

import Date from './Date';

const DateField = ({ name, label, labelClass, labelHidden, labelAttrs, id = name, required, helpId, ...props }) => (
  <FormGroup for={name}>
    {label && (
      <Label
        for={`${id}-picker`}
        className={labelClass}
        hidden={labelHidden}
        required={required}
        helpId={helpId}
        {...labelAttrs}
      >
        {label}
      </Label>
    )}
    <Date name={name} id={id} required={required} {...props} />
    <Feedback name={name} />
  </FormGroup>
);

DateField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  labelClass: PropTypes.string,
  labelHidden: PropTypes.bool,
  labelAttrs: PropTypes.object,
  required: PropTypes.bool,
  helpId: PropTypes.string,
};

export default DateField;
