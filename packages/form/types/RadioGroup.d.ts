import * as React from 'react';
import { FormGroupProps } from 'reactstrap';

interface RadioGroupProps extends FormGroupProps {
  name: string;
  label?: React.ReactNode;
  labelClassName?: string;
  groupClassName?: string;
  onChange?: (value: any) => void;
  inline?: boolean | false;
  helpId?: string;
  required?: boolean | false;
}

declare class RadioGroup extends React.Component<RadioGroupProps> {}

export default RadioGroup;
