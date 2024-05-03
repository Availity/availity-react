/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { FormGroupProps } from 'reactstrap';

export interface RadioGroupProps extends FormGroupProps {
  name: string;
  label?: ReactNode;
  labelClassName?: string;
  groupClassName?: string;
  onChange?: (value: any) => void;
  inline?: boolean;
  helpId?: string;
  required?: boolean;
  isHelpVideoType?: boolean;
}

declare const RadioGroup: (props: RadioGroupProps) => JSX.Element;

export default RadioGroup;
