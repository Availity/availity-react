/* eslint-disable @typescript-eslint/ban-types */
import { HTMLAttributes, ReactNode } from 'react';

interface RadioProps extends HTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  name?: string;
  id?: string;
  groupClassName?: string;
  value?: string | boolean | object;
  disabled?: boolean;
  helpId?: string;
}

declare const Radio: (props: RadioProps) => JSX.Element;

export default Radio;
