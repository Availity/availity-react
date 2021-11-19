import * as React from 'react';
import { SelectProps } from './Select';

export interface SelectFieldProps<T> extends SelectProps<T> {
  label?: React.ReactNode;
  labelHidden?: boolean;
  labelClass?: string;
  groupClass?: string;
  helpId?: string;
  required?: boolean;
  helpMessage?: string;
}

declare class SelectField<T = { [key: string]: any }> extends React.Component<SelectFieldProps<T>> {}

export default SelectField;
