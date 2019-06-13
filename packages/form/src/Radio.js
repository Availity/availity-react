import React from "react";
import PropTypes from 'prop-types';
import { Label, Input } from "reactstrap";
import classNames from "classnames";
import { useRadioGroup } from "./RadioGroup";
import FormGroup from "./FormGroup";

const Radio = ({
  label,
  value: checkValue,
  className,
  ...attributes
}) => {
  const { value, setValue, metadata } = useRadioGroup(checkValue);

  const classes = classNames(
    className,
    metadata.touched ? "is-touched" : "is-untouched",
    metadata.touched && metadata.error && "is-invalid"
  );

  return (
    <FormGroup for={checkValue} check inline disabled={attributes.disabled}>
      <Input
        name={checkValue}
        className={classes}
        type="radio"
        {...attributes}
        value={checkValue}
        checked={value}
        onChange={setValue}
      />
      <Label check for={checkValue}>
        {label}
      </Label>
    </FormGroup>
  );
};

Radio.propTypes = {
  label: PropTypes.string,
  value: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string
}

export default Radio;