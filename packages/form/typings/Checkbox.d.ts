import * as React from 'react';
import { InputProps } from './Input';

interface CheckboxProps extends InputProps {
  label?: React.ReactNode;
  value?: string | boolean | object;
  inline?: boolean;
  id?: string;
  groupClassName?: string;
}

declare class Checkbox extends React.Component<CheckboxProps> {}

export default Checkbox;
