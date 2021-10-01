import * as React from 'react';
import { DateProps } from './Date';

export type DateFieldProps = {
  id: string;
  label?: React.ReactNode;
  labelClass?: string;
  labelHidden?: boolean;
  labelAttrs?: React.HTMLAttributes<HTMLLabelElement>;
} & DateProps;

declare class DateField extends React.Component<DateFieldProps> {}

export default DateField;
