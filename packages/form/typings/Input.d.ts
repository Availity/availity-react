import * as React from 'react';

export interface InputProps extends React.FormHTMLAttributes<HTMLFormElement> {
    name: string;
    tag?: Node | string;
}

declare class Input<T = {[key: string]: any}> extends React.Component<InputProps> {}

export default Input;