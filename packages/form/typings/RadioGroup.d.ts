import * as React from 'react';
import { FormGroupProps } from './FormGroup';

interface RadioGroupProps extends FormGroupProps {
  name: string;
  label?: Node;
  onChange?: (value: any) => void;
  inline?: boolean | false;
}

declare class RadioGroup extends React.Component<RadioGroupProps> {}

export default RadioGroup;
