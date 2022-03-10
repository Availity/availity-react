/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from 'react';
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

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  [key: string]: any;
  type?: InputType;
  name: string;
  validate?: FieldValidator;
  tag?: Node | string;
  feedback?: boolean;
  help?: boolean;
  required?: boolean;
}

declare const Input: (props: InputProps) => JSX.Element;

export default Input;
