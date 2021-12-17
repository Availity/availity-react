import * as React from 'react';
import { Props } from 'react-select';
import { FieldValidator } from 'formik';

interface GroupedOptions {
  label: string;
  options: any[];
  type: 'group';
}

export interface SelectProps<T> extends Props<{}> {
  loadOptions?: Function;
  raw?: boolean;
  options?: any[] | GroupedOptions[];
  labelKey?: any;
  className?: string;
  maxLength?: number;
  placeholder?: string;
  valueKey?: any;
  selectRef?: React.Ref<T>;
  name: string;
  validate?: FieldValidator;
  autofill?: boolean | object;
  creatable?: boolean;
  helpMessage?: string;
  feedback?: boolean;
}

declare class Select<T> extends React.Component<SelectProps<T>> {}

export default Select;
