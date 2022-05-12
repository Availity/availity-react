import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Feedback, Label } from '@availity/form';

import DateRange from './DateRange';

const DateRangeField = ({
  name,
  label,
  labelClass,
  labelHidden,
  labelAttrs,
  id = name,
  required,
  helpId,
  ...props
}) => (
  <FormGroup for={name}>
    {label && (
      <Label
        for={`${id.replace(/[^\da-z]/gi, '')}-start`}
        className={labelClass}
        hidden={labelHidden}
        required={required}
        helpId={helpId}
        {...labelAttrs}
      >
        {label}
      </Label>
    )}
    <DateRange name={name} id={id} ariaDescribedBy={`${name.toLowerCase()}-feedback`} {...props} />
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
  required: PropTypes.bool,
  helpId: PropTypes.string,
};

export default DateRangeField;
