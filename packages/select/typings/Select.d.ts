import * as React from 'react';
import { Props } from 'react-select/src/Select';

export interface SelectProps<T> extends Props<{}> {
  loadOptions?: Function;
  raw?: boolean;
  selectRef?: React.Ref<T>;
  name: string;
  autofill?: boolean | object;
  creatable?: boolean;
}

declare class Select<T> extends React.Component<SelectProps<T>> {}

export default Select;
