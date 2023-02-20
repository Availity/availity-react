import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import classNames from 'classnames';
import { Label, FormText } from 'reactstrap';

import AvSelect from './AvSelect';

class AvSelectField extends Component {
  getChildContext() {
    if (this.context.FormCtrl) {
      this.FormCtrl = { ...this.context.FormCtrl };
      const registerValidator = this.FormCtrl.register;
      this.FormCtrl.register = (input, updater = input && input.forceUpdate) => {
        registerValidator(input, () => {
          this.forceUpdate();
          if (updater) updater();
        });
      };
      return {
        FormCtrl: this.FormCtrl,
      };
    }
    return {
      FormCtrl: this.context.FormCtrl,
    };
  }

  render() {
    const {
      label,
      labelHidden,
      name,
      id = name,
      feedbackClass,
      groupClass,
      labelClass,
      helpMessage,
      ...attributes
    } = this.props;

    const validation = this.context.FormCtrl ? this.context.FormCtrl.getInputState(name) : {};
    let feedback = null;
    let ariaFeedback = {};
    if (validation.errorMessage) {
      const feedbackClasses = classNames('d-block', feedbackClass);
      const feedbackId = `${id}-feedback`;
      feedback = (
        <AvFeedback className={feedbackClasses} id={feedbackId}>
          {validation.errorMessage}
        </AvFeedback>
      );
      ariaFeedback = { feedbackId, errorMessage: validation.errorMessage };
    }

    let thisLabel = false;
    if (label) {
      let forLabel = id;
      if (attributes.inputId) {
        forLabel = attributes.inputId;
      } else {
        attributes.inputId = id;
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
        <AvSelect name={name} ariaFeedback={ariaFeedback} helpMessage={helpMessage} {...attributes} />
        {helpMessage ? <FormText id={`${name}-helpmessage`.toLowerCase()}>{helpMessage}</FormText> : null}
        {feedback}
      </AvGroup>
    );
  }
}

AvSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  /** The name of the field. Will be the key of the selected option(s) that come through in the values of the onSubmit callback of the form. */
  label: PropTypes.node,
  labelHidden: PropTypes.bool,
  id: PropTypes.string,
  /** Adds hidden help message to placeholder so it is read with aria-describedby (should match visible help message). */
  helpMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** ClassName to add to the AvFeedback */
  feedbackClass: PropTypes.string,
  /** ClassName to add to the wrapping AvGroup */
  groupClass: PropTypes.string,
  /** The key for the label you want to appear in the dropdown for the user to see. */
  labelClass: PropTypes.string,
};

AvSelectField.contextTypes = {
  FormCtrl: PropTypes.object,
};

AvSelectField.childContextTypes = {
  FormCtrl: PropTypes.object,
};

export default AvSelectField;
