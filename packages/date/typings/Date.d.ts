import * as React from 'react';
import { SingleDatePickerShape } from 'react-dates';

export type limitType = {
  value?: number;
  units?: string;
};

export type limitTypeAlt = {
  _d?: string;
  _isValid?: Function;
};

export interface DateBaseProps {
  id: string;
  name: string;
  disabled?: boolean | false;
  className?: string;
  min?: string | limitType | limitTypeAlt;
  max?: string | limitType | limitTypeAlt;
  calendarIcon?: React.ReactNode;
  onChange?: Function;
  onPickerFocusChange?: Function;
  innerRef?: Function | string;
  datePickerProps?: object;
  format?: string;
}

export interface DateProps extends SingleDatePickerShape, DateBaseProps {}

declare class Date extends React.Component<DateProps> {}

export default Date;
