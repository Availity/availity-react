import * as React from 'react';

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  value?: string | boolean | object;
  inline?: boolean;
  disabled?: boolean;
  id?: string;
  groupClassName?: string;
  groupName?: string;
  helpId?: string;
}

declare class Checkbox extends React.Component<CheckboxProps> {}

export default Checkbox;
