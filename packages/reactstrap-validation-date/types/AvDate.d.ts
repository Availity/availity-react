import { SingleDatePickerShape } from '@availity/react-dates';
import { AvInput } from './AvInput';

export interface AvDateProps extends AvInput, SingleDatePickerShape {
  id: any;
  datepicker?: boolean;
}

declare const AvDate: React.ComponentType<AvDateProps>;

export default AvDate;
