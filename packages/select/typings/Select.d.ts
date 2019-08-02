import * as React from 'react';
import { Props } from 'react-select/src/Select';

export interface SelectProps extends Props<{}> {
    loadOptions?: Function;
    raw?: boolean;
    name: string;
    autofill?: boolean | object;
}

declare class Select<T = { [key: string]: any }> extends React.Component<
  SelectProps
> {}

export default Select;
