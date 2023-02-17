import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import { Col, FormText, Label } from 'reactstrap';

import AvDateRange from './AvDateRange';

const colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

class AvDateRangeField extends Component {
  getChildContext() {
    this.FormCtrl = { ...this.context.FormCtrl };
    const registerValidator = this.FormCtrl.register;
    const { getInputState } = this.FormCtrl;
    this.FormCtrl.getInputState = (inputName) => {
      if (inputName === this.props.start.name || inputName === this.props.end.name) {
        return this.getInputState();
      }
      return getInputState(inputName);
    };
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

  getInputState = () => {
    const startValidation = this.context.FormCtrl.getInputState(this.props.start.name);
    if (startValidation.errorMessage) return startValidation;
    const endValidation = this.context.FormCtrl.getInputState(this.props.end.name);
    return endValidation;
  };

  render() {
    let row = false;
    const col = {};
    const labelCol = {};
    const {
      helpMessage,
      label,
      labelHidden,
      inputClass,
      labelClass,
      children,
      id = this.props.name,
      size,
      disabled,
      readOnly,
      grid,
      labelAttrs,
      groupAttrs,
      ...attributes
    } = this.props;

    if (grid) {
      for (const colSize of colSizes) {
        if (grid[colSize]) {
          row = true;
          const sizeNum = Number.parseInt(grid[colSize], 10);
          col[colSize] = sizeNum;
          labelCol[colSize] = 12 - sizeNum;
        }
      }
    }

    const input = (
      <AvDateRange
        id={id}
        className={inputClass}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        ariaDescribedBy={`${this.props.name.toLowerCase()}-feedback`}
        {...attributes}
      >
        {children}
      </AvDateRange>
    );

    const validation = this.getInputState();

    const feedback = validation.error ? <AvFeedback className="d-block">{validation.errorMessage}</AvFeedback> : null;
    const help = helpMessage ? <FormText>{helpMessage}</FormText> : null;

    return (
      <AvGroup disabled={disabled} row={row} {...groupAttrs}>
        {label && (
          <Label for={id} className={labelClass} hidden={labelHidden} size={size} {...labelCol} {...labelAttrs}>
            {label}
          </Label>
        )}
        {row ? (
          <Col {...col}>
            {input}
            {feedback}
            {help}
          </Col>
        ) : (
          input
        )}
        {!row && feedback}
        {!row && help}
      </AvGroup>
    );
  }
}

AvDateRangeField.propTypes = {
  /** The name of the field. Will be the key of the selected date that comes through in the values of the onSubmit callback. */
  name: PropTypes.string.isRequired,
  /** The text that renders inside the Label above the input. */
  label: PropTypes.node,
  /** Used to control if the label is displayed. When set to true, the label in the field won't be visible. */
  labelHidden: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  id: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  helpMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Pass additional attributes to the label */
  labelAttrs: PropTypes.object,
  /** Pass additional attributes to the group */
  groupAttrs: PropTypes.object,
  grid: PropTypes.object,
  /** object which will be spread on the start date input. It must contain the name prop as required by availity-reactstrap-validation. It can contain additional validations as well. */
  start: PropTypes.object,
  /** object which will be spread on the end date input. It must contain the name prop as required by availity-reactstrap-validation. It can contain additional validations as well. */
  end: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};

AvDateRangeField.contextTypes = {
  FormCtrl: PropTypes.object.isRequired,
};

AvDateRangeField.childContextTypes = {
  FormCtrl: PropTypes.object.isRequired,
};

export default AvDateRangeField;
