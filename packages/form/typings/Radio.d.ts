import * as React from 'react';
import { InputProps } from './Input';

interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  id?: string;
<<<<<<< HEAD
=======
  groupClassName?: string;
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
  value?: string | boolean | object;
}

declare class Radio extends React.Component<RadioProps> {}

export default Radio;
