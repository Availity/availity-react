import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FieldHelpIcon } from '@availity/help';
import { Label, Input } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import { useCheckboxGroup } from './CheckboxGroup';
import FormGroup from './FormGroup';

const Checkbox = ({
  label,
  value: checkValue,
  groupClassName,
  className,
  id,
  inline,
  groupName,
  helpId,
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
  const groupFeedbackId =
    errorIndicated && groupName ? `${groupName}-feedback`.toLowerCase() : '';
  const labelId = `${inputId}-label`.toLowerCase();
  const helpIcon = helpId ? (
    <FieldHelpIcon id={helpId} labelId={labelId} />
  ) : (
    false
  );

  return (
    <FormGroup
      for={inputId}
      className={groupClassName}
      check
      inline={inline}
      disabled={attributes.disabled}
    >
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
  groupClassName: PropTypes.string,
  groupName: PropTypes.string,
  helpId: PropTypes.string,
};

Checkbox.defaultProps = {
  inline: true,
};

export default Checkbox;
