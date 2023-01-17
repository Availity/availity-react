/* eslint-disable @typescript-eslint/ban-types */
import { HTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  value?: string | boolean | object;
  inline?: boolean;
  disabled?: boolean;
  id?: string;
  groupClassName?: string;
  groupName?: string;
  helpId?: string;
}

declare const Checkbox: (props: CheckboxProps) => JSX.Element;

export default Checkbox;
