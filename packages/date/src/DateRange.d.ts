import * as React from 'react';
import { DateRangePickerShape } from '@availity/react-dates';
import { Moment } from 'moment';
import { DateProps } from './Date';

interface MomentDateRange {
  startDate: Moment;
  endDate: Moment;
}

export type DateRangeProps = {
  datepickerProps?: DateRangePickerShape;
  ranges?: boolean | string[] | { [key: string]: MomentDateRange };
  autoSync?: boolean;
  onChange?: (dates: { startDate: string; endDate: string }) => void;
  onPickerFocusChange?: (arg: { focusedInput: 'startDate' | 'endDate' | null }) => void;
  customArrowIcon?: React.ReactNode;
} & Omit<DateProps, 'datePickerProps'>;

declare const DateRange: (props: DateRangeProps) => JSX.Element;

export default DateRange;
