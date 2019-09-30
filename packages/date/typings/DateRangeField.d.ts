import * as React from 'react';
import { DateRangeProps } from './DateRange';

export interface DateRangeFieldProps extends DateRangeProps {
  label?: React.ReactNode;
  labelClass?: string;
  labelHidden?: boolean;
  labelAttrs?: object;
}

declare class DateRangeField extends React.Component<DateRangeFieldProps> {}

export default DateRangeField;
