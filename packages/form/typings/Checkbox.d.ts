import * as React from 'react';
import { InputProps } from './Input';

interface CheckboxProps extends InputProps {
  label?: React.ReactNode;
  value?: string | boolean | object;
  inline?: boolean;
<<<<<<< HEAD
=======
  id?: string;
  groupClassName?: string;
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
}

declare class Checkbox extends React.Component<CheckboxProps> {}

export default Checkbox;
