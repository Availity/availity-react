import * as React from 'react';
import { DateProps } from './Date';

export interface DateFieldProps extends DateProps {
  label?: React.ReactNode;
}

declare class DateField extends React.Component<DateFieldProps> {}

export default DateField;
