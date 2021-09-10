import * as React from 'react';
import { Props } from 'react-select/src/Select';
import { FieldValidator } from 'formik';

interface GroupedOptions {
  label: string;
  options: any[];
  type: 'group';
}

interface SelectByValue {
  value: string;
  key?: string;
}

export interface SelectProps<T> extends Props<{}> {
  loadOptions?: Function;
  raw?: boolean;
  options?: any[] | GroupedOptions[];
  labelKey?: any;
  className?: string;
  placeholder?: string;
  valueKey?: any;
  selectRef?: React.Ref<T>;
  name: string;
  validate?: FieldValidator;
  autofill?: boolean | object;
  creatable?: boolean;
  selectByValue?: SelectByValue;
}

declare class Select<T> extends React.Component<SelectProps<T>> {}

export default Select;
