import { ComponentType, ReactNode } from 'react';
import { AvSelectProps } from './AvSelect';

export interface AvSelectFieldProps extends AvSelectProps {
  label?: ReactNode;
  labelHidden?: boolean;
  id?: string;
  feedbackClass?: string;
  groupClass?: string;
  labelClass?: string;
  name: string;
  helpMessage?: ReactNode;
}

declare const AvSelectField: ComponentType<AvSelectFieldProps>;

export default AvSelectField;
