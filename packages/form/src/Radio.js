import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input } from 'reactstrap';
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
  const { value, setValue, metadata } = useRadioGroup(checkValue);

  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  return (
    <FormGroup for={checkValue} check inline disabled={attributes.disabled}>
      <Input
        id={id || checkValue}
        name={checkValue}
        className={classes}
        type="radio"
        {...attributes}
        value={checkValue}
        checked={value}
        onChange={setValue}
      />
      <Label check for={id || checkValue}>
        {label || children}
      </Label>
    </FormGroup>
  );
};

Radio.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Radio;
