import * as React from 'react';
import { InputProps } from './Input';

interface RadioProps extends InputProps {
  label?: React.ReactNode;
  value?: string | boolean | object;
}

declare class Radio extends React.Component<RadioProps> {}

export default Radio;
