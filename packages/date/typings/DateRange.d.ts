import * as React from 'react';
import { DateRangePicker } from 'react-dates';
import { Moment } from 'moment';
import { limitType, limitTypeAlt, DateBaseProps } from './Date';

interface MomentDateRange {
  startDate: (moment: Moment) => Moment;
  endDate: (moment: Moment) => Moment;
}

export interface DateRangeProps extends DateRangePicker, DateBaseProps {
  ranges?: boolean | string[] | { [key: string]: MomentDateRange };
  autoSync?: boolean;
}

declare class DateRange extends React.Component<DateRangeProps> {}

export default DateRange;
