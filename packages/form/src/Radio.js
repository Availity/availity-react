import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Label, Input } from 'reactstrap';
import uuid from 'uuid/v4';
import classNames from 'classnames';
import { useRadioGroup } from './RadioGroup';
import FormGroup from './FormGroup';

const Radio = ({
  label,
  id,
  value: checkValue,
  className,
  children,
  ...attributes
}) => {
  const { value, setValue, metadata, inline } = useRadioGroup(checkValue);

  const [inputId] = useState(id || uuid());

  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  return (
    <FormGroup
      for={inputId}
      check
      inline={inline}
      disabled={attributes.disabled}
    >
      <Input
        id={inputId}
        name={inputId}
        className={classes}
        type="radio"
        {...attributes}
        value={checkValue}
        checked={value}
        onChange={setValue}
      />
      <Label check for={inputId}>
        {label || children}
      </Label>
    </FormGroup>
  );
};

Radio.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Radio;
