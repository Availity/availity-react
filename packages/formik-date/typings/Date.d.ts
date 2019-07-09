import * as React from 'react';
import { SingleDatePickerShape } from 'react-dates';

export type limitType = {
  value?: number;
  units?: String;
};

export type limitTypeAlt = {
  _d?: string;
  _isValid?: Function;
};

export interface DateProps extends SingleDatePickerShape {
  name: string;
  disabled?: boolean | false;
  className: string;
  min?: string | limitType | limitTypeAlt;
  max?: string | limitType | limitTypeAlt;
  calendarIcon?: Node;
  onChange?: Function;
  onPickerFocusChange?: Function;
  innerRef?: Function | string;
  datePickerProps: object;
  format: string;
}

declare class Date extends React.Component<DateProps> {}

export default Date;
