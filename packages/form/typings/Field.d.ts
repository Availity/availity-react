import * as React from 'react';
import { InputProps } from './Input';
import { FormGroupProps } from './FormGroup';

<<<<<<< HEAD

export interface FieldProps extends InputProps {
    label?: React.ReactNode;
    labelHidden?: boolean | false;
    disabled?: boolean | false;
    readOnly?: boolean | false;
    size?: string;
    inputClass?: string;
    labelClass?: string;
    helpMessage?: string | object;
    errorMessage?: string | object;
    labelAttrs?: HTMLLabelElement;
    groupAttrs?: FormGroupProps;
    grid?: object;
=======
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
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
}

declare class Field extends React.Component<FieldProps> {}

<<<<<<< HEAD
export default Field;
=======
export default Field;
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
