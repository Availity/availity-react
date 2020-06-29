import * as React from 'react';
import { InputProps } from './Input';

interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  id?: string;
  groupClassName?: string;
  value?: string | boolean | object;
}

declare class Radio extends React.Component<RadioProps> {}

export default Radio;
