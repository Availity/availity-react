import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FieldHelpIcon } from '@availity/help';
import { Input, Label } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';

import { useCheckboxGroup } from './CheckboxGroup';
import FormGroup from './FormGroup';

const Checkbox = ({
  className,
  groupClassName,
  groupName,
  helpId,
  id,
  inline,
  label,
  value: checkValue,
  ...attributes
}) => {
  const { value, toggle, metadata } = useCheckboxGroup(checkValue);

  const [inputId] = useState(id || uuid());

  const classes = classNames(
    className,
    metadata.touched ? 'is-touched' : 'is-untouched',
    metadata.touched && metadata.error && 'is-invalid'
  );

  // should only reference feedback id when feedback is in the DOM
  const errorIndicated = !!metadata.touched && !!metadata.error;
  const groupFeedbackId = errorIndicated && groupName ? `${groupName}-feedback`.toLowerCase() : '';
  const labelId = `${inputId}-label`.toLowerCase();
  const helpIcon = helpId ? <FieldHelpIcon id={helpId} labelId={labelId} /> : null;

  return (
    <FormGroup for={inputId} className={groupClassName} check inline={inline} disabled={attributes.disabled}>
      <Input
        id={inputId}
        name={inputId}
        className={classes}
        type="checkbox"
        invalid={errorIndicated}
        aria-describedby={groupFeedbackId}
        {...attributes}
        value={checkValue}
        checked={value}
        onChange={toggle}
      />
      <Label check id={labelId} for={inputId}>
        {label}
      </Label>
      {helpIcon}
    </FormGroup>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  groupClassName: PropTypes.string,
  groupName: PropTypes.string,
  helpId: PropTypes.string,
  id: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
};

Checkbox.defaultProps = {
  inline: true,
};

export default Checkbox;
