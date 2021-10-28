import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, Feedback } from '@availity/form';
import { FieldHelpIcon } from '@availity/help';
import { Label as RsLabel } from 'reactstrap';

import Select from './Select';

const Label = ({ name, className, helpId, hidden, label }) => {
  if (!label) return null;

  return (
    <>
      <RsLabel id={`${name}-label`} for={name} hidden={hidden} className={className}>
        {label}
      </RsLabel>
      {helpId ? <FieldHelpIcon labelId={`${name}-label`} id={helpId} /> : null}
    </>
  );
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  helpId: PropTypes.string,
  hidden: PropTypes.bool,
  label: PropTypes.node,
};

const SelectField = ({ feedbackClass, groupClass, label, labelClass, labelHidden, name, helpId, ...attributes }) => {
  useEffect(() => {
    if (attributes.id && attributes.id === name) {
      // eslint-disable-next-line no-console
      console.warn(
        "Warning: Using an 'id' equivalent to 'name' will result in an orphaned label and break 508 compliance."
      );
    }
  }, [attributes.id, name]);

  return (
    <FormGroup className={groupClass} for={name} disabled={attributes.disabled}>
      <Label name={name} label={label} hidden={labelHidden} className={labelClass} helpId={helpId} />
      <Select name={name} {...attributes} />
      <Feedback className={classNames('d-block', feedbackClass)} name={name} />
    </FormGroup>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  feedbackClass: PropTypes.string,
  groupClass: PropTypes.string,
  helpId: PropTypes.string,
  label: PropTypes.node,
  labelClass: PropTypes.string,
  labelHidden: PropTypes.bool,
};

export default SelectField;
