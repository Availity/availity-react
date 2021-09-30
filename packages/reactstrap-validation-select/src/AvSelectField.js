import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import classNames from 'classnames';
import { Label } from 'reactstrap';

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
      id = this.props.name,
      feedbackClass,
      groupClass,
      labelClass,
      ...attributes
    } = this.props;

    const validation = this.context.FormCtrl ? this.context.FormCtrl.getInputState(this.props.name) : {};
    let feedback = null;
    if (validation.errorMessage) {
      const feedbackClasses = classNames('d-block', feedbackClass);
      feedback = <AvFeedback className={feedbackClasses}>{validation.errorMessage}</AvFeedback>;
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
        <AvSelect {...attributes} />
        {feedback}
      </AvGroup>
    );
  }
}

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

AvSelectField.childContextTypes = {
  FormCtrl: PropTypes.object,
};

export default AvSelectField;
