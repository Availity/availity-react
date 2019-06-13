import React from "react";
import PropTypes from 'prop-types';
import { Label, Input } from "reactstrap";
import classNames from "classnames";
import { useCheckboxGroup } from "./CheckboxGroup";
import FormGroup from "./FormGroup";

const Checkbox = ({
  label,
  value: checkValue,
  className,
  ...attributes
}) => {
  const { value, toggle, metadata } = useCheckboxGroup(checkValue);

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
        type="checkbox"
        {...attributes}
        value={checkValue}
        checked={value}
        onChange={toggle}
      />
      <Label check for={checkValue}>
        {label}
      </Label>
    </FormGroup>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string
}

export default Checkbox;