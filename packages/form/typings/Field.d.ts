import * as React from 'react';
import { InputProps } from './Input';
import { FormGroupProps } from './FormGroup';

interface FieldChildProps {
  input: React.ReactNode;
  feedback: React.ReactNode;
}

export interface FieldProps extends InputProps {
  label?: React.ReactNode;
  labelHidden?: boolean | false;
  disabled?: boolean | false;
  readOnly?: boolean | false;
  inputClass?: string;
  labelClass?: string;
  helpMessage?: string | object;
  errorMessage?: string | object;
  labelAttrs?: HTMLLabelElement;
  groupAttrs?: Partial<FormGroupProps>;
  grid?: object;
  children?: (props: FieldChildProps) => React.ReactNode;
  append?: string | React.ReactNode;
  prepend?: string | React.ReactNode;
}

declare class Field extends React.Component<FieldProps> {}

export default Field;
