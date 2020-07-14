import React from 'react';
import PropTypes from 'prop-types';
import {
  Input as RsInput,
  Label,
  FormText,
  Col,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from 'reactstrap';
import uuid from 'uuid/v4';
import { Feedback, FormGroup, Input } from '@availity/form';

const colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

const Field = ({
  helpMessage,
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
    colSizes.forEach(colSize => {
      if (grid[colSize]) {
        row = true;
        const sizeNum = parseInt(grid[colSize], 10);
        col[colSize] = sizeNum;
        labelCol[colSize] = 12 - sizeNum;
      }
    });
  }

  let input = (
    <Input
      name={id}
      id={inputId}
      className={inputClass}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      {...attributes}
    />
  );

  if (prepend || append) {
    input = (
      <InputGroup>
        {prepend && (
          <InputGroupAddon addonType="prepend">
            {typeof prepend === 'string' ? (
              <InputGroupText>{prepend}</InputGroupText>
            ) : (
              prepend
            )}
          </InputGroupAddon>
        )}
        {input}
        {append && (
          <InputGroupAddon addonType="append">
            {typeof append === 'string' ? (
              <InputGroupText>{append}</InputGroupText>
            ) : (
              append
            )}
          </InputGroupAddon>
        )}
        <Feedback name={id} />
      </InputGroup>
    );
  }

  const help = helpMessage ? <FormText>{helpMessage}</FormText> : null;
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
    <FormGroup
      for={id}
      check={check}
      disabled={disabled}
      row={row}
      {...groupAttrs}
    >
      {check && inputRow}
      {label && (
        <Label
          for={inputId}
          className={labelClass}
          hidden={labelHidden}
          size={size}
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
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  label: PropTypes.node,
  labelHidden: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  helpMessage: PropTypes.node,
  labelAttrs: PropTypes.object,
  groupAttrs: PropTypes.object,
  grid: PropTypes.object,
  children: PropTypes.func,
  append: PropTypes.node,
  prepend: PropTypes.node,
};

Field.defaultProps = {
  tag: RsInput,
};

export default Field;
