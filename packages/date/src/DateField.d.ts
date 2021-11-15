import * as React from 'react';
import { LabelProps } from '@availity/form';
import { DateProps } from './Date';

export type DateFieldProps = {
  label?: React.ReactNode;
  labelClass?: string;
  labelHidden?: boolean;
  labelAttrs?: LabelProps;
  required?: boolean;
  helpId?: string;
} & DateProps;

declare const DateField: (props: DateFieldProps) => JSX.Element;

export default DateField;
