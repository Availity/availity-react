import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormText, Input as RsInput, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { v4 as uuid } from 'uuid';

import Feedback from './Feedback';
import FormGroup from './FormGroup';
import Input from './Input';
import Label from './Label';

const colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

const Field = ({
  helpMessage,
  helpId,
  required,
  label,
  labelHidden,
  inputClass,
  labelClass,
  name: id,
  size,
  disabled,
  readOnly,
  grid,
  labelAttrs,
  groupAttrs,
  prepend,
  append,
  children,
  ...attributes
}) => {
  let row = false;
  const inputId = attributes.id || uuid();
  const col = {};
  const labelCol = {};

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

  let input = (
    <Input
      name={id}
      id={inputId}
      className={inputClass}
      size={size}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      feedback
      help={!!helpMessage}
      {...attributes}
    />
  );

  if (prepend || append) {
    input = (
      <InputGroup>
        {prepend && (
          <InputGroupAddon addonType="prepend">
            {typeof prepend === 'string' ? <InputGroupText>{prepend}</InputGroupText> : prepend}
          </InputGroupAddon>
        )}
        {input}
        {append && (
          <InputGroupAddon addonType="append">
            {typeof append === 'string' ? <InputGroupText>{append}</InputGroupText> : append}
          </InputGroupAddon>
        )}
        <Feedback name={id} />
      </InputGroup>
    );
  }

  const help = helpMessage ? <FormText id={`${id}-helpmessage`.toLowerCase()}>{helpMessage}</FormText> : null;
  const feedback = <Feedback name={id} />;
  let inputRow = row ? (
    <Col {...col}>
      {input}
      {!prepend && !append && <Feedback name={id} />}
      {help}
    </Col>
  ) : (
    input
  );

  if (children && typeof children === 'function') {
    inputRow = children({ input: inputRow, feedback });
  }

  const check = attributes.type === 'checkbox';

  return (
    <FormGroup for={id} check={check} disabled={disabled} row={row} {...groupAttrs}>
      {check && inputRow}
      {label && (
        <Label
          id={`${inputId}-label`}
          for={inputId}
          className={labelClass}
          hidden={labelHidden}
          size={size}
          required={!!required}
          helpId={helpId}
          disabled={disabled}
          {...labelCol}
          {...labelAttrs}
        >
          {label}
        </Label>
      )}
      {!check && inputRow}
      {!row && !prepend && !append && feedback}
      {!row && help}
    </FormGroup>
  );
};

Field.propTypes = {
  /** Identifies the field and matches the validation schema. */
  name: PropTypes.string.isRequired,
  /** Append an InputAddon to the end of the Input. */
  append: PropTypes.node,
  /** Optionally override the way the input is rendered with child render prop. */
  children: PropTypes.func,
  /** Disable the <Field />. */
  disabled: PropTypes.bool,
  /* Object mapping number of columns to the label and input. */
  grid: PropTypes.object,
  /** Pass additional attributes to Form Group */
  groupAttrs: PropTypes.object,
  /** Help topic id, adds <FieldHelpIcon/> next to the label (should not be within label for accessibility). */
  helpId: PropTypes.string,
  /** Display info text below the field */
  helpMessage: PropTypes.node,
  /** Class names passed to the input tag. */
  inputClass: PropTypes.string,
  /** Contents of the field label. Renders within a Reactstrap <Label />. */
  label: PropTypes.node,
  /** Pass additional attributes to the label */
  labelAttrs: PropTypes.object,
  /** Class names passed to the label tag. */
  labelClass: PropTypes.string,
  /** Used to hide the label. */
  labelHidden: PropTypes.bool,
  /** Append an InputAddon to the start of the Input. */
  prepend: PropTypes.node,
  /** Mark the field as read only. */
  readOnly: PropTypes.bool,
  /** Will add aria-required to input, will add <RequiredAsterisk /> to label. */
  required: PropTypes.bool,
  /** Size of the input field. Potential values: "lg", "sm" */
  size: PropTypes.string,
  /** The Node or tag to substitute as the input field. Default is reactstrap Input tag. */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Field.defaultProps = {
  tag: RsInput,
};

export default Field;
