import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, Feedback } from '@availity/form';
import { Label } from 'reactstrap';
import Select from './Select';

const SelectField = ({
  feedbackClass,
  groupClass,
  label,
  labelClass,
  labelHidden,
  name,
  ...attributes
}) => {
  useEffect(() => {
    if (attributes.id && attributes.id === name) {
      console.warn(
        "Warning: Using an 'id' equivalent to 'name' will result in an orphaned label and break 508 compliance."
      );
    }
  }, [attributes.id, name]);

  let thisLabel = false;
  if (label) {
    thisLabel = (
      <Label for={name} hidden={labelHidden} className={labelClass}>
        {label}
      </Label>
    );
  }

  return (
    <FormGroup className={groupClass} for={name} disabled={attributes.disabled}>
      {thisLabel}
      <Select name={name} {...attributes} />
      <Feedback className={classNames('d-block', feedbackClass)} name={name} />
    </FormGroup>
  );
};

SelectField.propTypes = {
  feedbackClass: PropTypes.string,
  groupClass: PropTypes.string,
  label: PropTypes.node,
  labelClass: PropTypes.string,
  labelHidden: PropTypes.bool,
  name: PropTypes.string.isRequired,
};
export default SelectField;
