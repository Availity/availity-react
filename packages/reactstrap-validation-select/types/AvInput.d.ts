export type AvInput = {
  name: string;
  validationEvent?:
    | ''
    | 'onInput'
    | 'onChange'
    | 'onBlur'
    | 'onFocus'
    | Array<'onInput' | 'onChange' | 'onBlur' | 'onFocus'>;
  validate?: object;
  value?: any;
  defaultValue?: any;
  trueValue?: any;
  falseValue?: any;
  checked?: boolean;
  defaultChecked?: boolean;
  state?: boolean;
  type?: string;
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onKeyUp?: Function;
  onInput?: Function;
  onFocus?: Function;
  onBlur?: Function;
  onChange?: Function;
  onReset?: Function;
};
