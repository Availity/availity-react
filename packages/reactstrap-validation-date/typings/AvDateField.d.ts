import { AvDateProps } from './AvDate';
export interface AvDateFieldProps extends AvDateProps {
  label?: React.ReactNode;
  labelHidden?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  inputClass?: string;
  labelClass?: string;
  helpMessage?: string | object;
  errorMessage?: string | object;
  labelAttrs?: object;
  groupAttrs?: object;
  grid?: object;
  children?: React.ReactType;
  name: string;
  size?: string | number;
}

declare const AvDateField: React.ComponentType<AvDateFieldProps>;

export default AvDateField;
