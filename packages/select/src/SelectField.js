import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormText } from 'reactstrap';
import { FormGroup, Feedback, Label } from '@availity/form';

import Select from './Select';

const SelectField = ({
  feedbackClass,
  groupClass,
  label,
  labelClass,
  labelHidden,
  name,
  helpId,
  required,
  helpMessage,
  ...attributes
}) => {
  useEffect(() => {
    if (attributes.id && attributes.id === name) {
      // eslint-disable-next-line no-console
      console.warn(
        "Warning: Using an 'id' equivalent to 'name' will result in an orphaned label and break 508 compliance."
      );
    }
  }, [attributes.id, name]);

  const thisLabel = label ? (
    <Label
      id={`${name}-label`}
      for={name}
      hidden={labelHidden}
      className={labelClass}
      required={required}
      helpId={helpId}
    >
      {label}
    </Label>
  ) : null;

  return (
    <FormGroup className={groupClass} for={name} disabled={attributes.disabled}>
      {thisLabel}
      <Select name={name} feedback helpMessage={helpMessage} required={required} {...attributes} />
      <Feedback className={classNames('d-block', feedbackClass)} name={name} />
      {helpMessage ? <FormText id={`${name}-helpmessage`.toLowerCase()}>{helpMessage}</FormText> : null}
    </FormGroup>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  feedbackClass: PropTypes.string,
  groupClass: PropTypes.string,
  helpId: PropTypes.string,
  helpMessage: PropTypes.string,
  label: PropTypes.node,
  labelClass: PropTypes.string,
  labelHidden: PropTypes.bool,
  required: PropTypes.bool,
};

export default SelectField;
