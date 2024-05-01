/* eslint-disable @typescript-eslint/ban-types */
import { HTMLAttributes, ReactNode } from 'react';

export interface RadioProps extends HTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  name?: string;
  id?: string;
  groupClassName?: string;
  value?: string | boolean | object;
  disabled?: boolean;
  helpId?: string;
  isHelpVideoType?: boolean;
}

declare const Radio: (props: RadioProps) => JSX.Element;

export default Radio;
