import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Label, Input } from 'reactstrap';
import uuid from 'uuid/v4';
import classNames from 'classnames';
import { useCheckboxGroup } from './CheckboxGroup';
import FormGroup from './FormGroup';

const Checkbox = ({
  label,
  value: checkValue,
<<<<<<< HEAD
=======
  groupClassName,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  className,
  id,
  inline,
  ...attributes
}) => {
  const { value, toggle, metadata } = useCheckboxGroup(checkValue);

  const [inputId] = useState(id || uuid());

  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  return (
    <FormGroup
      for={inputId}
<<<<<<< HEAD
=======
      className={groupClassName}
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
      check
      inline={inline}
      disabled={attributes.disabled}
    >
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
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
<<<<<<< HEAD
=======
  groupClassName: PropTypes.string,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
};

Checkbox.defaultProps = {
  inline: true,
};

export default Checkbox;
