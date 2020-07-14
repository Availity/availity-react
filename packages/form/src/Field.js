import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { Input as RsInput, Label, FormText, Col } from 'reactstrap';
import uuid from 'uuid/v4';
import Feedback from './Feedback';
import FormGroup from './FormGroup';
import Input from './Input';
=======
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
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc

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
<<<<<<< HEAD
=======
  prepend,
  append,
  children,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
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

<<<<<<< HEAD
  const input = (
=======
  let input = (
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
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

<<<<<<< HEAD
  const help = helpMessage ? <FormText>{helpMessage}</FormText> : null;
  const inputRow = row ? (
    <Col {...col}>
      {input}
      <Feedback name={id} />
=======
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
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
      {help}
    </Col>
  ) : (
    input
  );
<<<<<<< HEAD
=======

  if (children && typeof children === 'function') {
    inputRow = children({ input: inputRow, feedback });
  }

>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
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
<<<<<<< HEAD
      {!row && <Feedback name={id} />}
=======
      {!row && !prepend && !append && feedback}
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
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
<<<<<<< HEAD
=======
  children: PropTypes.func,
  append: PropTypes.node,
  prepend: PropTypes.node,
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
};

Field.defaultProps = {
  tag: RsInput,
};

export default Field;
