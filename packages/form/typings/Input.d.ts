import * as React from 'react';
import { FieldValidator } from 'formik';

export type InputType =
  | 'text'
  | 'email'
  | 'select'
  | 'file'
  | 'radio'
  | 'checkbox'
  | 'textarea'
  | 'button'
  | 'reset'
  | 'submit'
  | 'date'
  | 'datetime-local'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'range'
  | 'search'
  | 'tel'
  | 'url'
  | 'week'
  | 'password'
  | 'datetime'
  | 'time'
  | 'color';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  [key: string]: any;
  type?: InputType;
  name: string;
  validate?: FieldValidator; 
  tag?: Node | string;
}

declare class Input extends React.Component<InputProps> {}

export default Input;
