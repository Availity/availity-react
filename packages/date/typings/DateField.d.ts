import * as React from 'react';
import { DateProps } from './Date';

export interface DateFieldProps extends DateProps {
  label?: React.ReactNode;
  labelClass?: string;
  labelHidden?: boolean;
  labelAttrs?: React.HTMLAttributes<HTMLLabelElement>;
}

declare class DateField extends React.Component<DateFieldProps> {}

export default DateField;
