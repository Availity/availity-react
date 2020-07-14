import * as React from 'react';
import { DateRangePicker } from 'react-dates';
import { Moment } from 'moment';
import { limitType, limitTypeAlt, DateBaseProps } from './Date';

interface MomentDateRange {
<<<<<<< HEAD
  startDate: (moment: Moment) => Moment;
  endDate: (moment: Moment) => Moment;
=======
  startDate: Moment;
  endDate: Moment;
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
}

export interface DateRangeProps extends DateRangePicker, DateBaseProps {
  ranges?: boolean | string[] | { [key: string]: MomentDateRange };
  autoSync?: boolean;
}

declare class DateRange extends React.Component<DateRangeProps> {}

export default DateRange;
