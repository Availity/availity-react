import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FieldHelpIcon } from '@availity/help';
import { Input, Label } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';

import { useRadioGroup } from './RadioGroup';
import FormGroup from './FormGroup';

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
  const helpIcon = helpId ? <FieldHelpIcon id={helpId} labelId={labelId} /> : null;

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
      <Label check id={labelId} for={inputId}>
        {label || children}
      </Label>
      {helpIcon}
    </FormGroup>
  );
};

Radio.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  groupClassName: PropTypes.string,
  helpId: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
};

export default Radio;
