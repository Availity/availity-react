import * as React from 'react';
import { DateProps } from './Date';

export interface DateFieldProps extends DateProps {
  label?: string;
}

declare class DateField extends React.Component<DateFieldProps> {}

export default DateField;
