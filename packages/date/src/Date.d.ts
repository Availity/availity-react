import * as React from 'react';
import { SingleDatePickerShape } from '@availity/react-dates';
import { FieldValidator } from 'formik';

export type limitType = {
  value?: number;
  units?: string;
};

export type limitTypeAlt = {
  _d?: string;
  _isValid?: Function;
};

export type DateProps = {
  id?: string;
  name: string;
  disabled?: boolean;
  className?: string;
  min?: string | limitType | limitTypeAlt;
  max?: string | limitType | limitTypeAlt;
  onChange?: (date: string) => void;
  onPickerFocusChange?: (arg: { focused: boolean }) => void;
  innerRef?: Function | string;
  format?: string;
  datePickerProps?: SingleDatePickerShape;
  validate?: FieldValidator;
  openDirection?: 'down' | 'up';
};

declare const Date: (props: DateProps) => JSX.Element;

export default Date;
