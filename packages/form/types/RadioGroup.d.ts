/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { FormGroupProps } from 'reactstrap';

interface RadioGroupProps extends FormGroupProps {
  name: string;
  label?: ReactNode;
  labelClassName?: string;
  groupClassName?: string;
  onChange?: (value: any) => void;
  inline?: boolean | false;
  helpId?: string;
  required?: boolean | false;
}

declare const RadioGroup: (props: RadioGroupProps) => JSX.Element;

export default RadioGroup;
