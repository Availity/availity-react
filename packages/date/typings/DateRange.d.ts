import * as React from 'react';
import { DateRangePicker } from 'react-dates';
import { Moment } from 'moment';
import { DateBaseProps } from './Date';

interface MomentDateRange {
  startDate: Moment;
  endDate: Moment;
}

export interface DateRangeProps extends DateRangePicker, DateBaseProps {
  ranges?: boolean | string[] | { [key: string]: MomentDateRange };
  autoSync?: boolean;
}

declare class DateRange extends React.Component<DateRangeProps> {}

export default DateRange;
