import { AvInput } from './AvInput';
import { SingleDatePickerShape } from 'react-dates';

export interface AvDateProps extends AvInput, SingleDatePickerShape {
  id: any;
  datepicker?: boolean;
}

declare const AvDate: React.ComponentType<AvDateProps>;

export default AvDate;
