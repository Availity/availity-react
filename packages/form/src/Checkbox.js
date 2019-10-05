import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input } from 'reactstrap';
import uuid from 'uuid/v4';
import classNames from 'classnames';
import { useCheckboxGroup } from './CheckboxGroup';
import FormGroup from './FormGroup';

const Checkbox = ({
  label,
  value: checkValue,
  className,
  id,
  ...attributes
}) => {
  const { value, toggle, metadata } = useCheckboxGroup(checkValue);

  const inputId = id || uuid();

  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  return (
    <FormGroup for={inputId} check inline disabled={attributes.disabled}>
      <Input
        id={inputId}
        name={inputId}
        className={classes}
        type="checkbox"
        {...attributes}
        value={checkValue}
        checked={value}
        onChange={toggle}
      />
      <Label check for={inputId}>
        {label}
      </Label>
    </FormGroup>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Checkbox;
