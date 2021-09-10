import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Label, Input } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import { useRadioGroup } from './RadioGroup';
import FormGroup from './FormGroup';

const Radio = ({
  label,
  id,
  name,
  value: checkValue,
  className,
  groupClassName,
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

  const errorIndicated = !!metadata.touched && !!metadata.error;
  const feedbackId =
    errorIndicated && name ? `${name}-feedback`.toLowerCase() : '';

  return (
    <FormGroup
      for={inputId}
      check
      className={groupClassName}
      inline={inline}
      disabled={attributes.disabled}
    >
      <Input
        id={inputId}
        name={name || inputId}
        className={classes}
        type="radio"
        invalid={errorIndicated}
        aria-describedby={feedbackId}
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
  name: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  groupClassName: PropTypes.string,
  children: PropTypes.node,
};

export default Radio;
