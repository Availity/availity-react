import { AvInput } from './AvInput';

interface AriaFeedbackType {
  feedbackId: string;
  errorMessage: dtring;
}

export interface AvSelectProps extends AvInput {
  options?: Array<Object>;
  loadOptions?: Function;
  raw?: boolean;
  autofill?: boolean | object;
  ariaFeedback?: AriaFeedbackType;
}

declare const AvSelect: React.ComponentType<AvSelectProps>;

export default AvSelect;
