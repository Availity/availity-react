import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, Feedback } from '@availity/form';
import { Label } from 'reactstrap';
import Select from './Select';

const SelectField = ({
  label,
  labelHidden,
  name,
  feedbackClass,
  groupClass,
  labelClass,
  ...attributes
}) => {
  let thisLabel = false;
  if (label) {
    let forLabel = name;
    if (attributes.inputId) {
      forLabel = attributes.inputId;
    } else {
      attributes.inputId = name;
    }
    thisLabel = (
      <Label for={forLabel} hidden={labelHidden} className={labelClass}>
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
  label: PropTypes.node,
  labelHidden: PropTypes.bool,
  id: PropTypes.string,
  feedbackClass: PropTypes.string,
  groupClass: PropTypes.string,
  labelClass: PropTypes.string,
  name: PropTypes.string.isRequired,
};
export default SelectField;
