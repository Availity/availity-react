import { AvInput } from './AvInput';

export interface AvSelectProps extends AvInput {
  options?: Array<Object>;
  loadOptions?: Function;
  raw?: boolean;
  autofill?: boolean | object;
  ariaMessage?: Object;
}

declare const AvSelect: React.ComponentType<AvSelectProps>;

export default AvSelect;
