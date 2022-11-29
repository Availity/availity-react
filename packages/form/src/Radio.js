import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';

import { useRadioGroup } from './RadioGroup';
import FormGroup from './FormGroup';
import Label from './Label';

const Radio = ({ label, id, name, value: checkValue, className, groupClassName, children, helpId, ...attributes }) => {
  const { value, setValue, metadata, inline } = useRadioGroup(checkValue);

  const [inputId] = useState(id || uuid());

  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  const errorIndicated = !!metadata.touched && !!metadata.error;
  const feedbackId = errorIndicated && name ? `${name}-feedback`.toLowerCase() : '';
  const labelId = `${inputId}-label`.toLowerCase();

  return (
    <FormGroup for={inputId} check className={groupClassName} inline={inline} disabled={attributes.disabled}>
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
      <Label check id={labelId} for={inputId} helpId={helpId}>
        {label || children}
      </Label>
    </FormGroup>
  );
};

Radio.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** Disables the radio button. */
  disabled: PropTypes.bool,
  groupClassName: PropTypes.string,
  /** Help topic id, adds <FieldHelpIcon/> next to the label (should not be within label for accessibility). */
  helpId: PropTypes.string,
  /** Id for the radio button. */
  id: PropTypes.string,
  /** Label for the radio button. */
  label: PropTypes.node,
  /** Should match <RadioGroup /> name for validation and accessibly linking button to form feedback. */
  name: PropTypes.string,
  /** Value of the radio button. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
};

export default Radio;
