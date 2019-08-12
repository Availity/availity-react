import * as React from 'react';
import { DateRangePicker } from 'react-dates';
import { limitType, limitTypeAlt, DateBaseProps } from './Date';

export interface DateRangeProps extends DateRangePicker,DateBaseProps {
}

declare class DateRange extends React.Component<DateRangeProps> {}

export default DateRange;
