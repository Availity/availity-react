import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, Feedback } from '@availity/form';
import { FieldHelpIcon } from '@availity/help';
import { Label } from 'reactstrap';
import Select from './Select';

const SelectField = ({ feedbackClass, groupClass, label, labelClass, labelHidden, name, helpId, ...attributes }) => {
  useEffect(() => {
    if (attributes.id && attributes.id === name) {
      // eslint-disable-next-line no-console
      console.warn(
        "Warning: Using an 'id' equivalent to 'name' will result in an orphaned label and break 508 compliance."
      );
    }
  }, [attributes.id, name]);

  let thisLabel = false;
  const helpIcon = helpId ? <FieldHelpIcon labelId={`${name}-label`} id={helpId} /> : null;
  if (label) {
    thisLabel = (
      <>
        <Label id={`${name}-label`} for={name} hidden={labelHidden} className={labelClass}>
          {label}
        </Label>
        {helpIcon}
      </>
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
  helpId: PropTypes.string,
};
export default SelectField;
