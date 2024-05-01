/* eslint-disable @typescript-eslint/ban-types */
import { ReactNode } from 'react';

import { InputProps } from './Input';
import { Props as FormGroupProps } from './FormGroup';

interface FieldChildProps {
  input: ReactNode;
  feedback: ReactNode;
}

export interface FieldProps extends InputProps {
  label?: ReactNode;
  labelHidden?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  inputClass?: string;
  labelClass?: string;
  helpMessage?: string | object;
  errorMessage?: string | object;
  labelAttrs?: HTMLLabelElement;
  groupAttrs?: Partial<FormGroupProps>;
  grid?: object;
  children?: (props: FieldChildProps) => ReactNode;
  append?: string | ReactNode;
  prepend?: string | ReactNode;
  helpId?: string;
  isHelpVideoType?: boolean;
}

declare const Field: (props: FieldProps) => JSX.Element;

export default Field;
