import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import { Col, FormText, Label } from 'reactstrap';

import AvDate from './AvDate';

const colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

class AvDateField extends Component {
  getChildContext() {
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
      <AvDate id={id} className={inputClass} size={size} disabled={disabled} readOnly={readOnly} {...attributes}>
        {children}
      </AvDate>
    );

    const validation = this.context.FormCtrl.getInputState(this.props.name);

    const feedback = validation.errorMessage ? (
      <AvFeedback className="d-block">{validation.errorMessage}</AvFeedback>
    ) : null;
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

AvDateField.propTypes = {
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
  /** The name of the class for the label. Will be passed to the className prop of the label in the field. */
  labelClass: PropTypes.string,
  helpMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Pass additional attributes to the label */
  labelAttrs: PropTypes.object,
  /** Pass additional attributes to the AvGroup */
  groupAttrs: PropTypes.object,
  grid: PropTypes.object,
  children: PropTypes.node,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

AvDateField.contextTypes = {
  FormCtrl: PropTypes.object.isRequired,
};

AvDateField.childContextTypes = {
  FormCtrl: PropTypes.object.isRequired,
};

export default AvDateField;
