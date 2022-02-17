import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormText, Input as RsInput, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { v4 as uuid } from 'uuid';

import Feedback from './Feedback';
import FormGroup from './FormGroup';
import Input from './Input';
import Label from './Label';
import { useField } from 'formik';

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

  const [,{ error }] = useField(id);

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
      aria-describedby={error ? `${id}-feedback`.toLowerCase() : undefined}
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
  name: PropTypes.string.isRequired,
  append: PropTypes.node,
  children: PropTypes.func,
  disabled: PropTypes.bool,
  grid: PropTypes.object,
  groupAttrs: PropTypes.object,
  helpId: PropTypes.string,
  helpMessage: PropTypes.node,
  inputClass: PropTypes.string,
  label: PropTypes.node,
  labelAttrs: PropTypes.object,
  labelClass: PropTypes.string,
  labelHidden: PropTypes.bool,
  prepend: PropTypes.node,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Field.defaultProps = {
  tag: RsInput,
  required: false,
};

export default Field;
