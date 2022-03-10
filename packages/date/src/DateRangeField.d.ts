import * as React from 'react';
import { DateRangeProps } from './DateRange';

export type DateRangeFieldProps = {
  label?: React.ReactNode;
  labelClass?: string;
  labelHidden?: boolean;
  labelAttrs?: React.HTMLAttributes<HTMLLabelElement>;
  required?: boolean;
  helpId?: string;
} & DateRangeProps;

declare const DateRangeField: (props: DateRangeFieldProps) => JSX.Element;

export default DateRangeField;
