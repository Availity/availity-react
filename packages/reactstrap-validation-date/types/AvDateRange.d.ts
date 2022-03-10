import { DateRangePicker } from '@availity/react-dates';
import { AvInput } from './AvInput';

export interface AvDateRangeProps extends AvInput, DateRangePicker {
  start?: AvInput;
  end?: AvInput;
  validate?: object;
  type?: string;
  disabled?: boolean;
  distance?: object;
  defaultValues?: object;
  theme?: object;
  hideIcon?: boolean;
  autoSync?: boolean;
}

declare const AvDateRange: React.ComponentType<AvDateRangeProps>;

export default AvDateRange;
