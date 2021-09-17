import * as React from 'react';

interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  name?: string;
  id?: string;
  groupClassName?: string;
  value?: string | boolean | object;
  disabled?: boolean;
  helpId?: string;
}

declare class Radio extends React.Component<RadioProps> {}

export default Radio;