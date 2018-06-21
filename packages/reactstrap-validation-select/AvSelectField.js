import React from 'react';
import PropTypes from 'prop-types';
import { AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import classNames from 'classnames';
import { Label } from 'reactstrap';

import AvSelect from './AvSelect';

const AvSelectField = (props, { FormCtrl }) => {
  const {
    label,
    labelHidden,
    id = props.name,
    feedbackClass,
    groupClass,
    labelClass,
    ...attributes
  } = props;

  const validation = FormCtrl ? FormCtrl.getInputState(props.name) : {};
  let feedback = null;
  if (validation.errorMessage) {
    const feedbackClasses = classNames('d-block', feedbackClass);
    feedback = (
      <AvFeedback className={feedbackClasses}>
        {validation.errorMessage}
      </AvFeedback>
    );
  }

  const selectAttributes = { ...attributes };

  let thisLabel = false;
  if (label) {
    let forLabel = id;
    if (selectAttributes.inputId) {
      forLabel = selectAttributes.inputId;
    } else {
      selectAttributes.inputId = id;
    }
    thisLabel = (
      <Label for={forLabel} hidden={labelHidden} className={labelClass}>
        {label}
      </Label>
    );
  }

  return (
    <AvGroup className={groupClass}>
      {thisLabel}
      <AvSelect {...selectAttributes} />
      {feedback}
    </AvGroup>
  );
};

AvSelectField.propTypes = {
  label: PropTypes.node,
  labelHidden: PropTypes.bool,
  id: PropTypes.string,
  feedbackClass: PropTypes.string,
  groupClass: PropTypes.string,
  labelClass: PropTypes.string,
  name: PropTypes.string.isRequired,
};

AvSelectField.contextTypes = {
  FormCtrl: PropTypes.object,
};

export default AvSelectField;
