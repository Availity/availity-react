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
  /** The name of the field and name of the HTML Input. Without this, no input will be rendered. Will be the key of the selected option(s) that come through in the values of the onSubmit callback of the form. */
  name: PropTypes.string.isRequired,
  /** Class names to pass to the Feedback. */
  feedbackClass: PropTypes.string,
  /** Class names to pass to the FormGroup. */
  groupClass: PropTypes.string,
  /** Help topic id, adds <FieldHelpIcon/> next to the label (should not be within label for accessibility). */
  helpId: PropTypes.string,
  /** Adds help message below input. */
  helpMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** The label to render above the Select input. */
  label: PropTypes.node,
  /** Class names to pass to the Label. */
  labelClass: PropTypes.string,
  /** Whether the label should be hidden. */
  labelHidden: PropTypes.bool,
  /** Will add <RequiredAsterisk /> to label. */
  required: PropTypes.bool,
};

export default SelectField;
