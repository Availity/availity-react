import * as React from 'react';
import { Props } from 'react-select/src/Select';
import { FieldValidator } from 'formik';

export interface SelectProps<T> extends Props<{}> {
  loadOptions?: Function;
  raw?: boolean;
  options?: any[];
  labelKey?: any;
  className?: string;
  placeholder?: string;
  valueKey?: any;
  selectRef?: React.Ref<T>;
  name: string;
  validate?: FieldValidator;
  autofill?: boolean | object;
  creatable?: boolean;
}

declare class Select<T> extends React.Component<SelectProps<T>> {}

export default Select;
