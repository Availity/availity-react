import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';

import { useCheckboxGroup } from './CheckboxGroup';
import FormGroup from './FormGroup';
import Label from './Label';

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
      <Label check id={labelId} for={inputId} helpId={helpId}>
        {label}
      </Label>
    </FormGroup>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  /** Disables the checkbox. */
  disabled: PropTypes.bool,
  groupClassName: PropTypes.string,
  /** Should match <CheckboxGroup /> name to accessibly link input to form feedback. */
  groupName: PropTypes.string,
  /** Help topic id, adds <FieldHelpIcon/> next to the label (should not be within label for accessibility). */
  helpId: PropTypes.string,
  /** Id and name for the checkbox. */
  id: PropTypes.string,
  /** Will render the checkbox inline with other checkboxes. Default: true. */
  inline: PropTypes.bool,
  /** Label for the checkbox. */
  label: PropTypes.node,
  /** Value of the checkbox. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
};

Checkbox.defaultProps = {
  inline: true,
};

export default Checkbox;
