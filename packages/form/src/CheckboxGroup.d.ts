/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { FormGroupProps } from 'reactstrap';

export interface CheckboxGroupProps extends FormGroupProps {
  name: string;
  label?: ReactNode;
  labelClassName?: string;
  groupClassName?: string;
  onChange?: (value: any) => void;
  helpId?: string;
  required?: boolean | false;
}

declare const CheckboxGroup: (props: CheckboxGroupProps) => JSX.Element;

export default CheckboxGroup;
