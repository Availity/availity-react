import { AvDateRangeProps } from './AvDateRange';

export interface AvDateRangeFieldProps extends AvDateRangeProps {
  label?: React.ReactType;
  labelHidden?: boolean;
  readOnly?: boolean;
  inputClass?: string;
  labelClass?: string;
  helpMessage?: string | object;
  errorMessage?: string | object;
  // todo - make these more defined shapes
  labelAttrs?: object;
  groupAttrs?: object;
  grid?: object;
  size?: string | number;
  name: string;
}

declare const AvDateRangeField: React.ComponentType<AvDateRangeFieldProps>;

export default AvDateRangeField;
